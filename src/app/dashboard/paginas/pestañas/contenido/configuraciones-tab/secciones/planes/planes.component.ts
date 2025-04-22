import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { shareReplay, tap } from 'rxjs';
import { plan } from 'src/interfaces/plan';
import { zona_localidad, zona } from 'src/interfaces/zona';
import { PlanesService } from 'src/servicios/planes.service';
import { ZonasService } from 'src/servicios/zonas.service';
import { ConfirmarComponent } from 'src/standalone/confirmar/confirmar.component';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent {

  planes$ = this.planesService.planes$.pipe(shareReplay(1));

  planForm: FormGroup;
  planSeleccionado?: plan
  constructor(private planesService: PlanesService, private fb: FormBuilder, private modalService:NgbModal) {
    this.planForm = this.fb.group({
      id: [null],
      identificador: [null, [Validators.required, Validators.minLength(3)]],
      nombre: [null, [Validators.required, Validators.minLength(3)]],
      bonificacion: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  guardarPlan() {
    if (this.planForm.valid) {
      const plan = this.planForm.value;

      if (plan.id) {
        // 🔵 Está editando
        this.planesService.actualizarplan(plan).subscribe(() => {
          this.reiniciarFormulario();
        });
      } else {
        // 🟢 Está creando
        this.planesService.nuevoplan(plan).subscribe(() => {
          this.reiniciarFormulario();
        });
      }
    } else {
      this.planForm.markAllAsTouched();
    }
  }

  seleccionarPlan(planSeleccionado: plan) {
    this.planSeleccionado = planSeleccionado
    // 🔥 Patchea el formulario con el plan seleccionado
    this.planForm.patchValue({
      id: planSeleccionado.id,
      identificador: planSeleccionado.identificador,
      nombre: planSeleccionado.nombre,
      bonificacion: planSeleccionado.bonificacion
    });
  }

  reiniciarFormulario() {
    this.planSeleccionado=undefined
    this.planForm.reset();
  }

  confirmarEliminar(plan:plan){
      const modalEliminar = this.modalService.open(ConfirmarComponent,{backdrop:'static'})
      modalEliminar.componentInstance.itemAEliminar =`(${plan.identificador}) - ${plan.nombre} con ${plan.bonificacion} de bonificacion?`
      modalEliminar.result.then(r=>{
        if(r)
          this.eliminarPlan(plan.id)
      })
    }

  private eliminarPlan(idPlan:number){
    this.planesService.borrarplan(idPlan)
  }

}

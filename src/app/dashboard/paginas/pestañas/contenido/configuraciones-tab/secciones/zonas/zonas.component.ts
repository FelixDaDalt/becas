import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { shareReplay, tap } from 'rxjs';
import { zona_localidad, zona } from 'src/interfaces/zona';
import { ZonasService } from 'src/servicios/zonas.service';
import { ConfirmarComponent } from 'src/standalone/confirmar/confirmar.component';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})
export class ZonasComponent {
  activo:number=0
  localidadNombre:string=""
  localidades:zona_localidad[] = []
  zonas$ = this.zonasService.zonas$.pipe(
    tap(zonas => {
      const zonaSeleccionada = this.localidadForm.get('id_zona')?.value
      if(zonas && zonaSeleccionada){
        this.localidades = zonas.find(zona => zona.id == zonaSeleccionada)?.zona_localidads || []
      }
    }))

  localidadForm:FormGroup

  constructor(private zonasService:ZonasService,private fb:FormBuilder, private modalService:NgbModal){
    this.localidadForm = this.fb.group({
      id: [null],
      nombre:[null,[Validators.required,Validators.minLength(3)]],
      id_zona:[null,[Validators.required]]
    })
  }

  seleccionarZona(zonaSeleccionada:zona){
    this.localidadNombre = zonaSeleccionada.nombre
    this.localidadForm.get('id_zona')?.patchValue(zonaSeleccionada.id);
    this.localidades = zonaSeleccionada.zona_localidads || []
  }



  guardarLocalidad() {
    if (this.localidadForm.valid) {
      const formValue = this.localidadForm.value;

      if (formValue.id) {
        // 🛠 Editar localidad
        this.zonasService.actualizarLocalidad(formValue)
      } else {
        // ➕ Nueva localidad
        this.zonasService.nuevaLocalidad(formValue)
      }
    } else {
      this.localidadForm.markAllAsTouched();
    }
  }

  confirmarEliminar(){
      const nombre = this.localidadForm.get('nombre')?.value
      const id = this.localidadForm.get('id')?.value

      if(nombre && id){
        const modalEliminar = this.modalService.open(ConfirmarComponent,{backdrop:'static'})
        modalEliminar.componentInstance.itemAEliminar = nombre
        modalEliminar.result.then(r=>{
          if(r)
            this.borrarLocalidad(id)
        })
      }

    }

  private borrarLocalidad(id:number){
      this.zonasService.borrarLocalidad(id).subscribe(()=>{
        this.localidadForm.patchValue({
          id: null,
          nombre: null,
        })
      })
  }


  seleccionarLocalidad(localidad: zona_localidad) {
    this.localidadForm.patchValue({
      id: localidad.id,
      nombre: localidad.nombre,
      // id_zona ya lo tenés cargado desde seleccionarZona
    });
  }

  cancelarSeleccion(){
    this.localidadForm.patchValue({
      id: null,
      nombre:null,
      // id_zona ya lo tenés cargado desde seleccionarZona
    });
  }
}

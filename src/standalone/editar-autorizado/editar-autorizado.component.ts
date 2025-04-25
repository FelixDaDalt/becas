import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { shareReplay, take } from 'rxjs';
import { ErrorFormularioComponent } from "../error-formulario/error-formulario.component";
import { BotonCargandoComponent } from "../boton-cargando/boton-cargando.component";
import { AutorizadoService } from 'src/servicios/autorizado.service';

@Component({
  selector: 'app-editar-autorizado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorFormularioComponent, BotonCargandoComponent],
  templateUrl: './editar-autorizado.component.html',
  styleUrls: ['./editar-autorizado.component.css']
})
export class EditarAutorizadoComponent implements OnInit{

  @Input() idAutorizado?:number
  formularioEdicion:FormGroup
  utilizadas = 0;

  constructor(private autorizadoService:AutorizadoService,
    private activeModal:NgbActiveModal,
    private fb:FormBuilder
  ){
    this.formularioEdicion = this.fb.group({
      id:[null,Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['',Validators.pattern(/^\d+$/)],
      celular: ['',Validators.pattern(/^\d+$/)],
      email: ['',Validators.email],
      cantidad: ['',[Validators.required,Validators.min(0)]],
      utilizadas:['',[Validators.required,Validators.min(0)]]
    })
  }

  ngOnInit(): void {
  if (this.idAutorizado) {
    this.autorizadoService.obtenerAutorizado(this.idAutorizado)
      .pipe(take(1), shareReplay(1))
      .subscribe(autorizado => {
        this.utilizadas = autorizado.utilizadas;
        this.formularioEdicion.patchValue(autorizado);

        // Aplicar validador dinámico una vez que tenés becasUsadas
        this.formularioEdicion.get('cantidad')?.setValidators([
          Validators.required,
          Validators.min(this.utilizadas) // 🔥 acá va la lógica
        ]);
        this.formularioEdicion.get('cantidad')?.updateValueAndValidity();
      });
  }
}

  cerrar(){
    this.activeModal.close()
  }


  submitForm() {
    if (this.formularioEdicion.valid ) {
      const formData = this.formularioEdicion.value
      this.autorizadoService.editarAutorizado(formData).subscribe(respuesta=>{
        this.activeModal.close(true)
      })
    }else{
      this.formularioEdicion.markAllAsTouched()
    }
  }
}

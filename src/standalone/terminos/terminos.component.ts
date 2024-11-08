import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from 'src/interfaces/usuario';
import { TerminosService } from 'src/servicios/terminos.service';
import { usuarioService } from 'src/servicios/usuario.service';
import { ErrorFormularioComponent } from "../error-formulario/error-formulario.component";


@Component({
  selector: 'app-terminos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorFormularioComponent],
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.css']
})
export class tycComponent{

  formulario: FormGroup;
  mostrarPassword = false;
  terminos=this.terminosService.tyc$

  @Input() usuario?:Usuario

  constructor(private activeModal: NgbActiveModal,
    private fb:FormBuilder,
    private usuarioService:usuarioService,
    private terminosService:TerminosService)
  {
    this.terminosService.obtenerTyC()
    this.formulario = this.fb.group({
      password: [null, [Validators.required]],
    })
  }


  cancelar() {
    this.activeModal.close(false);
  }

  aceptar() {
    if (this.formulario.valid) {
      const pass = this.formulario.get('password')?.value
      const password = {password:pass}
      this.usuarioService.aceptarTyc(password).subscribe(respuesta => {
        this.activeModal.close(respuesta.data.datos);
      })
    }else{
      this.formulario.markAllAsTouched()
    }
  }

  cambiarVisibilidad(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

}

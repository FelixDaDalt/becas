import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/interfaces/usuario';
import { usuarioService } from 'src/servicios/usuario.service';
import { ErrorFormularioComponent } from "../error-formulario/error-formulario.component";


@Component({
  selector: 'app-cambio-pass',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ErrorFormularioComponent],
  templateUrl: './cambio-pass.component.html',
  styleUrls: ['./cambio-pass.component.css']
})
export class CambioPassComponent implements OnInit{

  formulario: FormGroup;
  mostrarPassword = false;
  @Input() alerta=true
  @Input() usuario?:Usuario

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private usuarioService:usuarioService)
    {
    this.formulario = this.fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    }, { validators: this.passwordsMatch }); // Agregar el validador aquí en el FormGroup
  }

  ngOnInit(): void { }

  // Validación personalizada para comprobar que las contraseñas coinciden
  private passwordsMatch(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value; // Obtener el valor de password
    const confirmPassword = formGroup.get('confirmPassword')?.value; // Obtener el valor de confirmPassword

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  cancelar() {
    this.activeModal.close(false);
  }

  aceptar() {
    if (this.formulario.valid) {
      const pass = this.formulario.get('password')?.value
      const password = {password:pass}
      this.usuarioService.cambiarPassword(password).subscribe(respuesta => {
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

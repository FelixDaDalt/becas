import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AdminService } from 'src/servicios/admin.service';

@Component({
  selector: 'app-alta-administrador',
  templateUrl: './alta-administrador.component.html',
  styleUrls: ['./alta-administrador.component.css']
})
export class AltaAdministradorComponent {

  wizardForm: FormGroup;
  currentStep = 0;
  logoPreview: string | ArrayBuffer | null = null;
  steps = [
    {nombre:'1-Datos',descripcion:'Datos Principales'},
    {nombre:'2-Acceso',descripcion:'Datos de Acceso'},
  ]
  mostrarPassword=false

  constructor(private fb: FormBuilder,
    private router:Router,
    private adminService:AdminService,
    private activeRoute:ActivatedRoute) {

    this.wizardForm = this.fb.group({
      // Paso 1: Datos principales
      datosPrincipales: this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        telefono: ['',Validators.pattern(/^\d+$/)],
        celular: ['',Validators.pattern(/^\d+$/)],
      }),
      // Paso 2: Acceso
      acceso: this.fb.group({
        dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^\d+$/)]],
        password: ['', [Validators.required,Validators.minLength(8)]],
      })
    });
  }

  get stepControls() {
    const steps = ['datosPrincipales', 'acceso'];
    return this.wizardForm.get(steps[this.currentStep]) as FormGroup;
  }

  goToNextStep() {
    if (this.stepControls.valid) {
      this.currentStep++;
    } else {
      this.stepControls.markAllAsTouched();
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submitForm() {
    if (this.wizardForm.valid) {
      const formData = this.estructurarFormulario();
      this.adminService.altaAdministrador(formData).subscribe(respuesta=>{;
        this.router.navigate(['../administradores'],{relativeTo:this.activeRoute});
      })
    }else{
      this.wizardForm.markAllAsTouched()
    }
  }


  comprobarDni(){
    const dni = this.wizardForm.get('acceso.dni')?.value
    if(dni){
      this.adminService.comprobarDni(dni).pipe(
        take(1)
      ).subscribe(
        disponible => {
          if (!disponible) {
            this.wizardForm.get('acceso.dni')?.setErrors({ noDisponible: true });
          }
          this.wizardForm.get('acceso.dni')?.markAsTouched()
        }
      )
    }else{
      this.wizardForm.get('acceso.dni')?.markAsTouched()
    }
  }


  cambiarVisibilidad(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  private estructurarFormulario() {
    // Extraemos los valores de cada grupo del formulario
    const datosPrincipales = this.wizardForm.get('datosPrincipales')?.value;
    const acceso = this.wizardForm.get('acceso')?.value;

    // Construimos el objeto con el formato deseado
    const formulario = {
        dni: acceso.dni,
        password: acceso.password,
        nombre: datosPrincipales.nombre,
        apellido: datosPrincipales.apellido,
        telefono: datosPrincipales.telefono,
        celular: datosPrincipales.celular
      }

    return formulario;
  }

  cancelar(){
    this.router.navigate(['../'],{relativeTo:this.activeRoute})
  }
}

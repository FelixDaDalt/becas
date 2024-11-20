
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AutorizadoService } from 'src/servicios/autorizado.service';
import { ComprobarService } from 'src/servicios/comprobar.service';


@Component({
  selector: 'app-alta-autorizado',
  templateUrl: './alta-autorizado.component.html',
  styleUrls: ['./alta-autorizado.component.css']
})
export class AltaAutorizadoComponent{
  wizardForm: FormGroup;
  currentStep = 0;


  steps = [
    {nombre:'1-Datos',descripcion:'Datos Principales'},
    {nombre:'2-Acceso',descripcion:'Datos de Acceso'}
  ]
  mostrarPassword=false

  constructor(private fb: FormBuilder,
    private router:Router,
    private autorizadoService:AutorizadoService,
    private comprobarService:ComprobarService,
    private activeRoute: ActivatedRoute) {


    this.wizardForm = this.fb.group({
      // Paso 1: autorizado
      autorizado: this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        telefono: ['',Validators.pattern(/^\d+$/)],
        celular: ['',Validators.pattern(/^\d+$/)],
        email: ['',Validators.email],
      }),
      // Paso 2: Acceso
      acceso: this.fb.group({
        dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^\d+$/)]],
        password: ['', [Validators.required,Validators.minLength(8)]],
      })
    });
  }


  get stepControls() {
    const steps = ['autorizado','acceso'];
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
      this.autorizadoService.altaAutorizado(formData).subscribe(respuesta=>{
        this.router.navigate(['../autorizados'], {relativeTo:this.activeRoute});
      })
    }else{
      this.wizardForm.markAllAsTouched()
    }
  }

  comprobarDni(){
    const dni = this.wizardForm.get('acceso.dni')?.value
    if(dni){
      this.comprobarService.comprobarDni(dni).pipe(
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
    const autorizado = this.wizardForm.get('autorizado')?.value;
    const acceso = this.wizardForm.get('acceso')?.value;

    // Construimos el objeto con el formato deseado
    const formulario = {
        dni: acceso.dni,
        password: acceso.password,
        nombre: autorizado.nombre,
        apellido: autorizado.apellido,
        telefono: autorizado.telefono,
        celular: autorizado.celular,
        email: autorizado.email
      }
    return formulario;
  }
}

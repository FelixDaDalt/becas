import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ColegioService } from 'src/servicios/colegio.service';
import { ComprobarService } from 'src/servicios/comprobar.service';
import { ResponsableService } from 'src/servicios/responsable.service';

@Component({
  selector: 'app-alta-responsable',
  templateUrl: './alta-responsable.component.html',
  styleUrls: ['./alta-responsable.component.css']
})
export class AltaResponsableComponent implements OnInit{
  wizardForm: FormGroup;
  currentStep = 0;
  colegios$=this.colegioService.colegios$

  steps = [
    {nombre:'1-Datos',descripcion:'Datos Principales'},
    {nombre:'2-Acceso',descripcion:'Datos de Acceso'}
  ]
  mostrarPassword=false

  constructor(private fb: FormBuilder,
    private router:Router,
    private responsableService:ResponsableService,
    private colegioService:ColegioService,
    private comprobarService:ComprobarService,
    private activeRoute: ActivatedRoute) {


    this.wizardForm = this.fb.group({
      // Paso 1: Responsable
      responsable: this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        telefono: ['',Validators.pattern(/^\d+$/)],
        celular: ['',Validators.pattern(/^\d+$/)],
        email: ['',Validators.email],
      }),
      // Paso 2: Acceso
      acceso: this.fb.group({
        id_colegio:[null,[Validators.required]],
        dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^\d+$/)]],
        password: ['', [Validators.required,Validators.minLength(8)]],
      })
    });
  }

  ngOnInit(): void {
    const query:any = this.activeRoute.snapshot.queryParams;
    if(query && query.idColegio){
      const control = this.wizardForm.get('acceso.id_colegio')
      control?.patchValue(Number(query.idColegio))
      control?.disable()
    }
  }

  get stepControls() {
    const steps = ['responsable','acceso'];
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
      this.responsableService.altaResponsable(formData).subscribe(respuesta=>{
        const actualizar = true;
        this.router.navigate(['../responsables'],{relativeTo:this.activeRoute});
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
    const responsable = this.wizardForm.get('responsable')?.value;
    const acceso = this.wizardForm.get('acceso')?.value;

    // Construimos el objeto con el formato deseado
    const formulario = {
        dni: acceso.dni,
        password: acceso.password,
        nombre: responsable.nombre,
        apellido: responsable.apellido,
        telefono: responsable.telefono,
        celular: responsable.celular,
        email: responsable.email,
        id_colegio:acceso.id_colegio,
      }
    return formulario;
  }
}

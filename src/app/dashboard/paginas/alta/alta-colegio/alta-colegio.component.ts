import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, shareReplay, take, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ZonasService } from 'src/servicios/zonas.service';
import { ColegioService } from 'src/servicios/colegio.service';
import { PlanesService } from 'src/servicios/planes.service';
import { FormasPagoService } from 'src/servicios/formas_pago.service';

@Component({
  selector: 'app-alta-colegio',
  templateUrl: './alta-colegio.component.html',
  styleUrls: ['./alta-colegio.component.css']
})
export class AltaColegioComponent  {

  public archivoSeleccionado: File | null = null;
  wizardForm: FormGroup;
  currentStep = 0;
  logoPreview: string | ArrayBuffer | null = null;
  steps = [
    {nombre:'1-Colegio',descripcion:'Datos Principales'},
    {nombre:'2-Colegio',descripcion:'Ubicación'},
    {nombre:'3-Colegio',descripcion:'Contacto'},
    {nombre:'4-Colegio',descripcion:'Perzonalización'},
    {nombre:'5-Responsable',descripcion:'Datos'},
    {nombre:'6-Responsable',descripcion:'Acceso'}
  ]
  mostrarPassword=false
  zonas$=this.zonaService.zonas$.pipe(shareReplay(1))
  localidades$ = this.zonas$.pipe(
    map(zonas => {
      // Crear un mapeo de id_zona a nombre de zona
      const zonaMap = zonas.reduce((acc:any, zona:any) => {
        acc[zona.id] = zona.nombre;
        return acc;
      }, {});

      // Transformar las localidades en una lista plana con nombre de zona
      return zonas.flatMap(zona =>
        zona.zona_localidads?.map(localidad => ({
          ...localidad,
          nombre_zona: zonaMap[localidad.id_zona?localidad.id_zona:'Sin Zona']
        }))
      );
    })
  );

  planPago$= this.planesService.planes$.pipe(shareReplay(1))
  formaPago$ = this.formasPagoService.pagos$.pipe(shareReplay(1))

  constructor(private fb: FormBuilder,
    private router:Router,
    private colegioService:ColegioService,
    private zonaService:ZonasService,
    private activeRoute:ActivatedRoute,
    private planesService:PlanesService,
    private formasPagoService:FormasPagoService
  ) {

    this.wizardForm = this.fb.group({
      // Paso 1: Datos principales
      datosPrincipales: this.fb.group({
        cuit: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^\d{11}$/)]],
        nombre: ['', Validators.required],
      }),
      // Paso 2: Ubicación
      ubicacion: this.fb.group({
        direccion_calle: ['', Validators.required],
        direccion_numero: ['', Validators.required],
        localidad: ['', Validators.required],
        provincia: ['', Validators.required],
        cp: ['', Validators.required],
        id_zona: [null, Validators.required],
      }),
      // Paso 3: Datos de contacto
      contacto: this.fb.group({
        telefono: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        email: ['', [Validators.required, Validators.email]],
      }),
      // Paso 4: Personalización
      personalizacion: this.fb.group({
        logo: [null],
        id_forma_pago: [null,[Validators.required]],
        id_plan: [null,[Validators.required]],
      }),
      // Paso 5: Responsable
      responsable: this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        telefono: ['',Validators.pattern(/^\d+$/)],
        celular: ['',Validators.pattern(/^\d+$/)],
        email: ['',Validators.email],
      }),
      // Paso 6: Accesp
      acceso: this.fb.group({
        dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^\d+$/)]],
        password: ['', [Validators.required,Validators.minLength(8)]],
      })
    });
  }

  get stepControls() {
    const steps = ['datosPrincipales', 'ubicacion', 'contacto', 'personalizacion','responsable','acceso'];
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
      const formData = this.crearFormData();
      this.colegioService.altaColegio(formData).subscribe(respuesta=>{
        this.router.navigate(['../colegios'],{relativeTo:this.activeRoute});
      })
    }else{
      this.wizardForm.markAllAsTouched()
    }
  }



  seleccionFoto(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0]; // Obtén el archivo seleccionado
    } else {
      this.archivoSeleccionado = null;
    }
  }



  comprobarDni(){
    const dni = this.wizardForm.get('acceso.dni')?.value
    if(dni){
      this.colegioService.comprobarDni(dni).pipe(
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


  comprobarCuit(){
    const cuit = this.wizardForm.get('datosPrincipales.cuit')?.value
    if(cuit){
      this.colegioService.comprobarCuit(cuit).pipe(
        take(1)
      ).subscribe(
        disponible => {
          if (!disponible) {
            this.wizardForm.get('datosPrincipales.cuit')?.setErrors({ noDisponible: true });
          }
          this.wizardForm.get('datosPrincipales.cuit')?.markAsTouched()
        }
      )
    }else{
      this.wizardForm.get('datosPrincipales.cuit')?.markAsTouched()
    }
  }

  cambiarVisibilidad(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }



  private crearFormData(): FormData {
    const formData = new FormData();

    // Datos principales
    const datosPrincipales = this.wizardForm.get('datosPrincipales')?.value;
    const ubicacion = this.wizardForm.get('ubicacion')?.value;
    const contacto = this.wizardForm.get('contacto')?.value;
    const personalizacion = this.wizardForm.get('personalizacion')?.value;
    const responsable = this.wizardForm.get('responsable')?.value;
    const acceso = this.wizardForm.get('acceso')?.value;

    // Colegio (campos anidados)
    formData.append('colegio[cuit]', datosPrincipales.cuit);
    formData.append('colegio[nombre]', datosPrincipales.nombre);
    formData.append('colegio[direccion_calle]', ubicacion.direccion_calle);
    formData.append('colegio[direccion_numero]', ubicacion.direccion_numero);
    formData.append('colegio[localidad]', ubicacion.localidad);
    formData.append('colegio[provincia]', ubicacion.provincia);
    formData.append('colegio[cp]', ubicacion.cp);
    formData.append('colegio[telefono]', contacto.telefono);
    formData.append('colegio[email]', contacto.email);
    formData.append('colegio[id_zona]', ubicacion.id_zona);
    formData.append('colegio[id_plan]', personalizacion.id_plan);
    formData.append('colegio[id_forma_pago]', personalizacion.id_forma_pago);

    // Usuario (campos anidados)
    formData.append('usuario[dni]', acceso.dni);
    formData.append('usuario[password]', acceso.password);
    formData.append('usuario[nombre]', responsable.nombre);
    formData.append('usuario[apellido]', responsable.apellido);
    formData.append('usuario[telefono]', responsable.telefono);
    formData.append('usuario[celular]', responsable.celular);
    formData.append('usuario[email]', responsable.email);


    if (this.archivoSeleccionado) {
      // Agregar logo si es un archivo
      formData.append('foto', this.archivoSeleccionado);
    }

  return formData;
  }


  cancelar(){
    this.router.navigate(['../'],{relativeTo:this.activeRoute})
  }
}


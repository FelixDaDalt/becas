import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { map, shareReplay, take, tap } from 'rxjs';
import { Colegio } from 'src/interfaces/colegio';
import { ColegioService } from 'src/servicios/colegio.service';
import { ZonasService } from 'src/servicios/zonas.service';



@Component({
  selector: 'app-editar-colegio',
  templateUrl: './editar-colegio.component.html',
  styleUrls: ['./editar-colegio.component.css']
})
export class EditarColegioComponent implements OnInit {

  public archivoSeleccionado: File | null = null;
    @Input()colegio?:Colegio
    wizardForm: FormGroup;
    currentStep = 0;

    steps = [
      {nombre:'1-Colegio',descripcion:'Datos Principales'},
      {nombre:'2-Colegio',descripcion:'Ubicación'},
      {nombre:'3-Colegio',descripcion:'Contacto'},
      {nombre:'4-Colegio',descripcion:'Perzonalización'}
    ]
    zonas$=this.zonaService.zonas$.pipe(shareReplay(1))
    localidades$ = this.zonas$.pipe(
      map(zonas => {
        console.log(zonas)
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

    constructor(
      private fb:FormBuilder,
      private activeModal:NgbActiveModal,
      private colegioService:ColegioService,
      private zonaService:ZonasService)
    {
      this.wizardForm = this.fb.group({
        // Paso 1: Datos principales
        datosPrincipales: this.fb.group({
          id:[null,Validators.required],
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
          url: ['', Validators.required],
          logo: [null]
        }),
      })
    }

    ngOnInit(): void {
      if(this.colegio){
        const datosPrincipales = this.wizardForm.get('datosPrincipales')
        const ubicacion = this.wizardForm.get('ubicacion')
        const contacto = this.wizardForm.get('contacto')
        const personalizacion = this.wizardForm.get('personalizacion')

        datosPrincipales?.patchValue({
          id:this.colegio.id,
          cuit:this.colegio.cuit,
          nombre:this.colegio.nombre
        })

        ubicacion?.patchValue({
          direccion_calle:this.colegio.direccion_calle,
          direccion_numero: this.colegio.direccion_numero,
          localidad: this.colegio.localidad,
          provincia: this.colegio.provincia,
          cp: this.colegio.cp,
          id_zona: this.colegio.id_zona
        })

        contacto?.patchValue({
          telefono: this.colegio.telefono,
          email: this.colegio.email
        })

        personalizacion?.patchValue({
          url: this.colegio.url
        })

      }

    }

    get stepControls() {
      const steps = ['datosPrincipales', 'ubicacion', 'contacto', 'personalizacion'];
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
        this.colegioService.editarColegio(formData).subscribe(respuesta=>{
          this.activeModal.close(true)
        })
      }else{
        this.wizardForm.markAllAsTouched()
      }
    }

    comprobarUrl(){
      const url = this.wizardForm.get('personalizacion.url')?.value
      if(url && url!=this.colegio?.url){
        this.colegioService.comprobarUrl(url).pipe(
          take(1)
        ).subscribe(
          disponible => {
            if (!disponible) {
              this.wizardForm.get('personalizacion.url')?.setErrors({ noDisponible: true });
            }
            this.wizardForm.get('personalizacion.url')?.markAsTouched()
          }
        )
      }else{
        this.wizardForm.get('personalizacion.url')?.markAsTouched()
      }
    }

    comprobarCuit(){
      const cuit = this.wizardForm.get('datosPrincipales.cuit')?.value
      if(cuit && cuit!=this.colegio?.cuit){
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

    private crearFormData(): FormData {
      const formData = new FormData();

      // Datos principales
      const datosPrincipales = this.wizardForm.get('datosPrincipales')?.value;
      const ubicacion = this.wizardForm.get('ubicacion')?.value;
      const contacto = this.wizardForm.get('contacto')?.value;
      const personalizacion = this.wizardForm.get('personalizacion')?.value;

      // Colegio (campos anidados)
      formData.append('colegio[id]', datosPrincipales.id);
      formData.append('colegio[cuit]', datosPrincipales.cuit);
      formData.append('colegio[nombre]', datosPrincipales.nombre);
      formData.append('colegio[direccion_calle]', ubicacion.direccion_calle);
      formData.append('colegio[direccion_numero]', ubicacion.direccion_numero);
      formData.append('colegio[localidad]', ubicacion.localidad);
      formData.append('colegio[provincia]', ubicacion.provincia);
      formData.append('colegio[cp]', ubicacion.cp);
      formData.append('colegio[telefono]', contacto.telefono);
      formData.append('colegio[email]', contacto.email);
      formData.append('colegio[url]', personalizacion.url);
      formData.append('colegio[id_zona]', ubicacion.id_zona);

      if (this.archivoSeleccionado) {
        // Agregar logo si es un archivo
        formData.append('foto', this.archivoSeleccionado);
      }

    return formData;
    }

    seleccionFoto(event: Event) {
      const input = event.target as HTMLInputElement;

      if (input.files && input.files.length > 0) {
        this.archivoSeleccionado = input.files[0]; // Obtén el archivo seleccionado
      } else {
        this.archivoSeleccionado = null;
      }
    }

    cerrar(){
      this.activeModal.close(false)
    }

}

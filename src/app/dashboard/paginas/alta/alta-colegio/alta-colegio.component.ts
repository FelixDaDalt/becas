import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, shareReplay, take, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ZonasService } from 'src/servicios/zonas.service';
import { ColegioService } from 'src/servicios/colegio.service';

@Component({
  selector: 'app-alta-colegio',
  templateUrl: './alta-colegio.component.html',
  styleUrls: ['./alta-colegio.component.css']
})
export class AltaColegioComponent  {

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
  zonas$=this.zonaService.zonas$.pipe(shareReplay(1),tap(r=>console.log(r)))
  localidades$ = this.zonas$.pipe(
    map(zonas => {
      // Crear un mapeo de id_zona a nombre de zona
      const zonaMap = zonas.reduce((acc:any, zona:any) => {
        acc[zona.id] = zona.nombre;
        return acc;
      }, {});

      // Transformar las localidades en una lista plana con nombre de zona
      return zonas.flatMap(zona =>
        zona.zona_localidad?.map(localidad => ({
          ...localidad,
          nombre_zona: zonaMap[localidad.id_zona?localidad.id_zona:'Sin Zona']
        }))
      );
    })
  );
  constructor(private fb: FormBuilder,
    private router:Router,
    private colegioService:ColegioService,
    private imageCompress: NgxImageCompressService,
    private zonaService:ZonasService,
    private activeRoute:ActivatedRoute) {

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
        url: ['', Validators.required],
        logo: [null]
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
      const formData = this.estructurarFormulario();
      this.colegioService.altaColegio(formData).subscribe(respuesta=>{
        this.router.navigate(['../colegios'],{relativeTo:this.activeRoute});
      })
    }else{
      this.wizardForm.markAllAsTouched()
    }
  }



  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const logo = this.wizardForm.get('personalizacion.logo');

    // Validar el tamaño del archivo
    if (file && file.size > 4 * 1024 * 1024) { // 1 MB en bytes
      logo?.setErrors({ maxFileSize: true });
      logo?.markAsTouched();
      return; // Salir de la función si el tamaño es demasiado grande
    }

    // Convertir archivo a base64 antes de comprimir
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result as string;

      // Comprimir la imagen
      const orientation = 1; // Normal
      const ratio = 100; // Escalar al 70%
      const quality = 100; // Calidad al 80%
      const maxwidth = 310; // Limitar ancho a 800 px
      const maxheight = 160; // Limitar altura a 600 px

      this.imageCompress.compressFile(base64Image, orientation, ratio, quality, maxwidth, maxheight).then(
        compressedImage => {
          // Validar el tamaño de la imagen comprimida
          const compressedSize = this.getBase64Size(compressedImage);
          if (compressedSize > 100 * 1024) { // 100 KB en bytes
            logo?.setErrors({ maxFileSize: true });
            logo?.markAsTouched();
            return; // Salir si el tamaño comprimido es demasiado grande
          }

          this.logoPreview = compressedImage; // Previsualización en el cliente
          logo?.setValue(compressedImage); // Guarda el archivo comprimido en formato base64 en el formulario
        }
      );
    };

    reader.readAsDataURL(file); // Leer el archivo como URL de datos (base64)
  }

  // Función para calcular el tamaño de una imagen en base64
  private getBase64Size(base64: string): number {
    // El tamaño en bytes se calcula como:
    // longitud de la cadena base64 / 4 * 3 (ajustando por el padding)
    return (base64.length * 3) / 4 - (base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0);
  }



  comprobarDni(){
    const dni = this.wizardForm.get('acceso.dni')?.value
    if(dni){
      this.colegioService.comprobarDni(dni).pipe(
        take(1)
      ).subscribe(
        disponible => {
          console.log(disponible)
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

  comprobarUrl(){
    const url = this.wizardForm.get('personalizacion.url')?.value
    if(url){
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

  private estructurarFormulario() {
    // Extraemos los valores de cada grupo del formulario
    const datosPrincipales = this.wizardForm.get('datosPrincipales')?.value;
    const ubicacion = this.wizardForm.get('ubicacion')?.value;
    const contacto = this.wizardForm.get('contacto')?.value;
    const personalizacion = this.wizardForm.get('personalizacion')?.value;
    const responsable = this.wizardForm.get('responsable')?.value;
    const acceso = this.wizardForm.get('acceso')?.value;

    // Construimos el objeto con el formato deseado
    const formulario = {
      colegio: {
        cuit: datosPrincipales.cuit,
        nombre: datosPrincipales.nombre,
        direccion_calle: ubicacion.direccion_calle,
        direccion_numero: ubicacion.direccion_numero,
        localidad: ubicacion.localidad,
        provincia: ubicacion.provincia,
        cp: ubicacion.cp,
        telefono: contacto.telefono,
        url: personalizacion.url,
        id_zona: ubicacion.id_zona,
        logo: personalizacion.logo
      },
      usuario: {
        dni: acceso.dni,
        password: acceso.password,
        nombre: responsable.nombre,
        apellido: responsable.apellido,
        telefono: responsable.telefono,
        celular: responsable.celular,
        email: responsable.email
      }
    };

    return formulario;
  }
}


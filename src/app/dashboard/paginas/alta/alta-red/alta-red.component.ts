import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, shareReplay, take, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ZonasService } from 'src/servicios/zonas.service';
import { ColegioService } from 'src/servicios/colegio.service';
import { RedService } from 'src/servicios/red.service';
import { Colegio } from 'src/interfaces/colegio';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alta-red',
  templateUrl: './alta-red.component.html',
  styleUrls: ['./alta-red.component.css']
})
export class AltaRedComponent  {
  apiFile=environment.fileUrl
  public archivoSeleccionado: File | null = null;
  wizardForm: FormGroup;
  currentStep = 0;
  logoPreview: string | ArrayBuffer | null = null;
  steps = [
    {nombre:'1-Red',descripcion:'Datos Principales'},
    {nombre:'2-Integrantes',descripcion:'Colegios'}
  ]

  colegios$=this.colegioService.colegios$.pipe(tap(r=>console.log(r)))
  colegiosSeleccionados:Colegio[] = []

  constructor(private fb: FormBuilder,
    private router:Router,
    private activeRoute:ActivatedRoute,
    private colegioService:ColegioService,
    private imageCompress: NgxImageCompressService,
    private redService:RedService) {
      this.colegioService.obtenerColegios()
    this.wizardForm = this.fb.group({
      // Paso 1: Datos principales
      datosPrincipales: this.fb.group({
        nombre: ['', Validators.required],
        foto: [null],
        porcentaje: [75, [Validators.required, Validators.min(0), Validators.max(100)]],
        caracteristicas: ['', Validators.required],
      }),
      // Paso 2: Ubicación
      integrantes: this.fb.array([])
    });
  }

  get stepControls() {
    const steps = ['datosPrincipales', 'integrantes'];
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
      console.log(formData)
      this.redService.altaRed(formData).subscribe(respuesta=>{
        this.router.navigate(['../redes'],{relativeTo:this.activeRoute});
      })
    }else{
      this.wizardForm.markAllAsTouched()
    }
  }

  get integrantes() {
    return this.wizardForm.get('integrantes') as FormArray;
  }

  onIntegrantesChange(selectedIntegrantes: any[]): void {
    this.integrantes.clear();
    this.colegiosSeleccionados = []
    selectedIntegrantes.forEach((colegio, index) => {
      const integrante = {
        id: colegio.id,
        anfitrion: index === 0 ? 1 : 0, // Marca el primer seleccionado como anfitrion
      };
      this.integrantes.push(new FormControl(integrante));
      this.colegiosSeleccionados.push(colegio)
    });
  }

  private crearFormData(): FormData {
    const formData = new FormData();

    // Datos principales
    const datosPrincipales = this.wizardForm.get('datosPrincipales')?.value;
    for (const key in datosPrincipales) {
      if (key === 'foto' && this.archivoSeleccionado) {
        // Adjuntar la foto seleccionada al FormData
        formData.append('foto', this.archivoSeleccionado);
      } else {
        // Agregar los demás campos del grupo datosPrincipales
        formData.append(`red[${key}]`, datosPrincipales[key]);
      }
    }

    // Integrantes
    const integrantes = this.wizardForm.get('integrantes')?.value;
    formData.append('colegios', JSON.stringify(integrantes));

    return formData;
  }

  seleccionFoto(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0]; // Obtén el archivo seleccionado
      console.log('Archivo seleccionado:', this.archivoSeleccionado);
    } else {
      this.archivoSeleccionado = null;
      console.log('No se seleccionó ningún archivo');
    }
  }
}


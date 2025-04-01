import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { shareReplay, tap } from 'rxjs';
import { zona_localidad, zona } from 'src/interfaces/zona';
import { ZonasService } from 'src/servicios/zonas.service';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})
export class ZonasComponent {
  activo:number=0
  localidadNombre:string=""
  localidades:zona_localidad[] = []
  zonas$ = this.zonasService.zonas$.pipe(
    tap(zonas => {
      const zonaSeleccionada = this.localidadForm.get('id_zona')?.value
      if(zonas && zonaSeleccionada){
        this.localidades = zonas.find(zona => zona.id == zonaSeleccionada)?.zona_localidads || []
      }
    }))

  zonaForm:FormGroup
  localidadForm:FormGroup

  constructor(private zonasService:ZonasService,private fb:FormBuilder){
    this.zonaForm = this.fb.group({
      nombre:[null,[Validators.required,Validators.minLength(3)]]
    })

    this.localidadForm = this.fb.group({
      nombre:[null,[Validators.required,Validators.minLength(3)]],
      id_zona:[null,[Validators.required]]
    })
  }

  seleccionarZona(zonaSeleccionada:zona){
    this.localidadNombre = zonaSeleccionada.nombre
    this.localidadForm.get('id_zona')?.patchValue(zonaSeleccionada.id);
    this.localidades = zonaSeleccionada.zona_localidads || []
  }

  guardarZona(){
    if (this.zonaForm.valid) {
    this.zonasService.nuevaZona(this.zonaForm.value)
    this.zonaForm.get('nombre')?.patchValue(null);
    }else{
      this.zonaForm.markAsTouched()
    }
  }

  guardarLocalidad(){
    if (this.localidadForm.valid) {
      this.zonasService.nuevaLocalidad(this.localidadForm.value)
      this.localidadForm.get('nombre')?.patchValue(null);
    }else{
      this.localidadForm.markAsTouched()
    }
  }
}

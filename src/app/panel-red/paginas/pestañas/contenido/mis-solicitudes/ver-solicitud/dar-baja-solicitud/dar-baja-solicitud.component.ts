import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BecaService } from 'src/servicios/beca.service';

@Component({
  selector: 'app-dar-baja-solicitud',
  templateUrl: './dar-baja-solicitud.component.html',
  styleUrls: ['./dar-baja-solicitud.component.css']
})
export class DarBajaSolicitudComponent implements OnInit{

  resolverForm:FormGroup

  @Input() idSolicitud?:number
  @Input() idRed?:number

  constructor(private fb:FormBuilder, private becaService:BecaService){
    this.resolverForm = this.fb.group({
      id_solicitud: [null, [Validators.required]], // Número requerido
      baja_comentario: [null, [Validators.required]], // Cadena no vacía
    })

  }

  ngOnInit(): void {
    this.resolverForm.patchValue({id_solicitud:this.idSolicitud})
  }

  guardar(){
    if (this.resolverForm.valid && this.idRed) {
      this.becaService.darBaja(this.idRed,this.resolverForm.value,true)
    }else{
      this.resolverForm.markAllAsTouched()
    }
  }
}

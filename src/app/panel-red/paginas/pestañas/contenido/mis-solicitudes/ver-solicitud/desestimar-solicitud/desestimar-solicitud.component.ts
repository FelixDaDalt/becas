import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BecaService } from 'src/servicios/beca.service';

@Component({
  selector: 'app-desestimar-solicitud',
  templateUrl: './desestimar-solicitud.component.html',
  styleUrls: ['./desestimar-solicitud.component.css']
})
export class DesestimarSolicitudComponent implements OnInit{

  resolverForm:FormGroup

  @Input() idSolicitud?:number
  @Input() idRed?:number

  constructor(private fb:FormBuilder, private becaService:BecaService){
    this.resolverForm = this.fb.group({
      id_solicitud: [null, [Validators.required]], // Número requerido
      id_resolucion: [3, [Validators.required]], // Número positivo
      res_comentario: [null, [Validators.required]], // Cadena no vacía
    })

  }

  ngOnInit(): void {
    this.resolverForm.patchValue({id_solicitud:this.idSolicitud})
  }

  guardar(){
    if (this.resolverForm.valid && this.idRed) {
      this.becaService.desestimar(this.idRed,this.resolverForm.value)
    }else{
      this.resolverForm.markAllAsTouched()
    }
  }
}

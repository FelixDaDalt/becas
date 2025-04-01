import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BecaService } from 'src/servicios/beca.service';

@Component({
  selector: 'app-resolver-solicitud',
  templateUrl: './resolver-solicitud.component.html',
  styleUrls: ['./resolver-solicitud.component.css']
})
export class ResolverSolicitudComponent implements OnInit{

  resolverForm:FormGroup
  @Output() resuelto = new EventEmitter<boolean>()

  @Input() idSolicitud?:number
  @Input() idRed?:number

  constructor(private fb:FormBuilder, private becaService:BecaService){
    this.resolverForm = this.fb.group({
      id_solicitud: [null, [Validators.required]], // Número requerido
      id_resolucion: [null, [Validators.required]], // Número positivo
      res_comentario: [null], // Cadena no vacía
    })

  }

  ngOnInit(): void {
    this.resolverForm.patchValue({id_solicitud:this.idSolicitud})
  }

  guardar(){
    if (this.resolverForm.valid && this.idRed) {
      this.becaService.resolver(this.idRed,this.resolverForm.value)
      this.resuelto.emit(true)
    }else{
      this.resolverForm.markAllAsTouched()
    }
  }
}

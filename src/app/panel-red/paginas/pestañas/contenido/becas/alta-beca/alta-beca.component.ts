import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BecaService } from 'src/servicios/beca.service';

@Component({
  selector: 'app-alta-beca',
  templateUrl: './alta-beca.component.html',
  styleUrls: ['./alta-beca.component.css']
})
export class AltaBecaComponent {

  @Input() cantidad:number=0
  @Input() idRed?:number

  constructor(private activeModal:NgbActiveModal,private becaService:BecaService){

  }

  submitForm(){
    if(this.cantidad && this.idRed){
      const enviar = {
        cantidad:this.cantidad
      }
      this.becaService.altaBeca(enviar,this.idRed).subscribe(respuesta=>{
        this.activeModal.close(true)
      })
    }

  }

  cancelar(){
    this.activeModal.close(false)
  }
}

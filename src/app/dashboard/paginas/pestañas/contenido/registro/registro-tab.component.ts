import { Component} from '@angular/core';
import { RegistroService } from 'src/servicios/registro.service';

@Component({
  selector: 'app-registro-tab',
  templateUrl: './registro-tab.component.html',
  styleUrls: ['./registro-tab.component.css']
})
export class RegistroTabComponent{

registros$ = this.registroService.registros$

constructor(private registroService:RegistroService){
  this.registroService.obtenerRegistros()
}

}

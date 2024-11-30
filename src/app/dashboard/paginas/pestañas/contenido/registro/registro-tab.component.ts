import { AuthService } from './../../../../../../core/auth.service';
import { Component} from '@angular/core';
import { RegistroService } from 'src/servicios/registro.service';

@Component({
  selector: 'app-registro-tab',
  templateUrl: './registro-tab.component.html',
  styleUrls: ['./registro-tab.component.css']
})
export class RegistroTabComponent{

registros$ = this.registroService.registros$
registroAdmin=false

constructor(private registroService:RegistroService, private authService:AuthService){
  if(this.authService.userHasRole([1,2,3]))
  {
    this.registroService.obtenerRegistros()
    return
  }
  this.registroService.obtenerRegistrosAdmin()
  this.registroAdmin = true

}

}

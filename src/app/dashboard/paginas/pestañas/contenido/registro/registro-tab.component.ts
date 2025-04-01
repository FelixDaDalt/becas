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
filter: any;
busqueda: string = '';
constructor(private registroService:RegistroService, private authService:AuthService){
  if(this.authService.userHasRole([1,2,3]))
  {
    this.registroService.obtenerRegistros()
    return
  }
  this.registroService.obtenerRegistrosAdmin()
  this.registroAdmin = true

}

updateFilter() {
  this.filter = {
    $or: [
      { id: this.busqueda },
      { descripcion: this.busqueda },
      { fechaHora: this.busqueda },
      { accion: this.busqueda },
      { entidad: this.busqueda },
      { realizadoPor: this.busqueda },
      { ip: this.busqueda },
      { navegador: this.busqueda },
      { administrador:{
        $or: [{ nombre: this.busqueda }, { apellido: this.busqueda },{id:this.busqueda}]
      }},
      { usuario: {
        $or: [{ nombre: this.busqueda }, { apellido: this.busqueda }, {id:this.busqueda}]
      }},
    ]
  };
}

}

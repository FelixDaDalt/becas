import { Component} from '@angular/core';
import { AdminService } from 'src/servicios/admin.service';
import { ResponsableService } from 'src/servicios/responsable.service';


@Component({
  selector: 'app-responsables-tab',
  templateUrl: './responsables-tab.component.html',
  styleUrls: ['./responsables-tab.component.css']
})
export class ResponsablesTabComponent{

  cacheresponsables = false;
  responsables$=this.responsableService.responsables$

  constructor(
    private responsableService:ResponsableService,
    private adminService:AdminService){}

  ngOnInit(): void {
    if(!this.cacheresponsables){
      this.responsableService.obtenerResponsables()
      this.cacheresponsables = true
    }
  }

  reiniciarPassword(id:number){
    this.adminService.reiniciarPassword('user',id)
  }

  suspender(idResponsable:number){
    this.adminService.suspenderUsuario(idResponsable).subscribe(respuesta=>
      this.responsableService.obtenerResponsables()
    )
  }

}

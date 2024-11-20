import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { administrador } from 'src/interfaces/usuario';
import { AdminService } from 'src/servicios/admin.service';
import { PerfilUsuarioComponent } from 'src/standalone/perfil-usuario/perfil-usuario.component';
import { ConfirmarComponent } from 'src/standalone/confirmar/confirmar.component';


@Component({
  selector: 'app-administradores-tab',
  templateUrl: './administradores-tab.component.html',
  styleUrls: ['./administradores-tab.component.css']
})
export class AdministradoresTabComponent implements OnInit{

  administradores$=this.adminService.administradores$
  administradoresCache = false

  constructor(private adminService:AdminService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private modalService:NgbModal){}

  ngOnInit(): void {
    if(!this.administradoresCache){
      this.adminService.obtenerAdministradores()
      this.administradoresCache= true
    }
  }

  reiniciarPassword(id:number){
    this.adminService.reiniciarPassword('admin',id)
  }

  alta(){
    this.router.navigate(['../alta-administrador'], {relativeTo: this.activeRoute })
  }

  suspender(idAdmin:number){
    this.adminService.suspenderAdministrador(idAdmin)
  }

  verAdmin(idAdministrador:number){
    const modalUsuario = this.modalService.open(PerfilUsuarioComponent,{backdrop:'static'})
    modalUsuario.componentInstance.idUsuario = idAdministrador
    modalUsuario.componentInstance.admin = true
  }

  confirmarEliminar(administrador:administrador){
    const modalEliminar = this.modalService.open(ConfirmarComponent,{backdrop:'static'})
    modalEliminar.componentInstance.itemAEliminar = administrador.apellido + ', '+ administrador.nombre
    modalEliminar.result.then(r=>{
      if(r)
        this.eliminarAdmin(administrador.id)
    })
  }

  private eliminarAdmin(idAdmin:number){
    this.adminService.eliminarAdmin(idAdmin)
  }

}

import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/core/auth.service';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/interfaces/usuario';
import { AdminService } from 'src/servicios/admin.service';
import { DelegadoService } from 'src/servicios/delegado.service';
import { ConfirmarComponent } from 'src/standalone/confirmar/confirmar.component';
import { EditarMisDatosComponent } from 'src/standalone/editar-mis-datos/editar-mis-datos.component';
import { PerfilUsuarioComponent } from 'src/standalone/perfil-usuario/perfil-usuario.component';


@Component({
  selector: 'app-delegados-tab',
  templateUrl: './delegados-tab.component.html',
  styleUrls: ['./delegados-tab.component.css']
})
export class DelegadosTabComponent{
  apiFile=environment.fileUrl
  cachedelegados = false;
  delegados$=this.delegadoService.delegados$

  constructor(
    private delegadoService:DelegadoService,
    private adminService:AdminService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private modalService:NgbModal){}

  ngOnInit(): void {
    if(!this.cachedelegados){
      this.delegadoService.obtenerDelegados()
      this.cachedelegados = true
    }
  }

  reiniciarPassword(id:number){
    this.adminService.reiniciarPassword('user',id)
  }

  suspender(idResponsable:number){
    this.adminService.suspenderUsuario(idResponsable).subscribe(respuesta=>
      this.delegadoService.obtenerDelegados()
    )
  }

  alta(){
    this.router.navigate(['../alta-delegado'], {relativeTo: this.activeRoute })
  }

  verUsuario(idResponsable:number){
    const modalUsuario = this.modalService.open(PerfilUsuarioComponent,{backdrop:'static'})
    modalUsuario.componentInstance.idUsuario = idResponsable
  }

  confirmarEliminar(usuario:Usuario){
    const modalEliminar = this.modalService.open(ConfirmarComponent,{backdrop:'static'})
    modalEliminar.componentInstance.itemAEliminar = usuario.apellido + ', '+ usuario.nombre
    modalEliminar.result.then(r=>{
      if(r)
        this.eliminarUsuario(usuario.id)
    })
  }

  private eliminarUsuario(idUsuario:number){
    this.adminService.eliminarUsuario(idUsuario).subscribe(respuesta=>{
      this.delegadoService.obtenerDelegados()
    })
  }

  editar(Delegado:Usuario){
    const modalEditar = this.modalService.open(EditarMisDatosComponent,{backdrop:'static'})
    modalEditar.componentInstance.idUsuario = Delegado.id
    modalEditar.componentInstance.idRol = Delegado.id_rol
    modalEditar.result.then(r=>{
      if(r)
        this.delegadoService.obtenerDelegados()
    })
  }

}

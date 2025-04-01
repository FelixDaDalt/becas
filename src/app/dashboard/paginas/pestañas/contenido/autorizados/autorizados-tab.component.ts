import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { shareReplay } from 'rxjs';
import { AuthService } from 'src/core/auth.service';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/interfaces/usuario';
import { AdminService } from 'src/servicios/admin.service';
import { AutorizadoService } from 'src/servicios/autorizado.service';
import { ConfirmarComponent } from 'src/standalone/confirmar/confirmar.component';
import { EditarMisDatosComponent } from 'src/standalone/editar-mis-datos/editar-mis-datos.component';
import { PerfilUsuarioComponent } from 'src/standalone/perfil-usuario/perfil-usuario.component';


@Component({
  selector: 'app-autorizados-tab',
  templateUrl: './autorizados-tab.component.html',
  styleUrls: ['./autorizados-tab.component.css']
})
export class AutorizadosTabComponent{
  apiFile=environment.fileUrl
  cacheautorizados = false;
  autorizados$=this.autorizadoService.autorizados$.pipe(shareReplay(1))

  constructor(
    private autorizadoService:AutorizadoService,
    private adminService:AdminService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private modalService:NgbModal){}

  ngOnInit(): void {
    if(!this.cacheautorizados){
      this.autorizadoService.obtenerAutorizados()
      this.cacheautorizados = true
    }
  }

  reiniciarPassword(id:number){
    this.adminService.reiniciarPassword('user',id)
  }

  suspender(idAutorizado:number){
    this.adminService.suspenderUsuario(idAutorizado).subscribe(respuesta=>
      this.autorizadoService.obtenerAutorizados()
    )
  }

  alta(){
    this.router.navigate(['../alta-autorizado'], {relativeTo: this.activeRoute })
  }

  verUsuario(idAutorizado:number){
    const modalUsuario = this.modalService.open(PerfilUsuarioComponent,{backdrop:'static'})
    modalUsuario.componentInstance.idUsuario = idAutorizado
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
      this.autorizadoService.obtenerAutorizados()
    })
  }

  editar(Autorizado:Usuario){
    const modalEditar = this.modalService.open(EditarMisDatosComponent,{backdrop:'static'})
    modalEditar.componentInstance.idUsuario = Autorizado.id
    modalEditar.componentInstance.idRol = Autorizado.id_rol
    modalEditar.result.then(r=>{
      if(r)
        this.autorizadoService.obtenerAutorizados()
    })
  }

  filter: any;
  busqueda: string = '';
  updateFilter() {
    this.filter = {
      $or: [
        { dni: this.busqueda },
        { nombre: this.busqueda },
        { apellido: this.busqueda },
        { telefono: this.busqueda },
        { celular: this.busqueda }
      ]
    };
  }

}

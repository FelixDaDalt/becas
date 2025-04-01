import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { shareReplay, tap } from 'rxjs';
import { AuthService } from 'src/core/auth.service';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/interfaces/usuario';
import { AdminService } from 'src/servicios/admin.service';
import { ResponsableService } from 'src/servicios/responsable.service';
import { ConfirmarComponent } from 'src/standalone/confirmar/confirmar.component';
import { EditarMisDatosComponent } from 'src/standalone/editar-mis-datos/editar-mis-datos.component';
import { PerfilUsuarioComponent } from 'src/standalone/perfil-usuario/perfil-usuario.component';


@Component({
  selector: 'app-responsables-tab',
  templateUrl: './responsables-tab.component.html',
  styleUrls: ['./responsables-tab.component.css']
})
export class ResponsablesTabComponent{
  apiFile=environment.fileUrl
  cacheresponsables = false;
  responsables$=this.responsableService.responsables$.pipe(shareReplay(1))

  constructor(
    private responsableService:ResponsableService,
    private adminService:AdminService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private modalService:NgbModal,
    private authService:AuthService){}

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

  alta(){
    const user = this.authService.getUser()
    if(user && user.id_rol == 0){
      this.router.navigate(['../alta-responsable'], {relativeTo: this.activeRoute })
    }else if(user && user.id_rol == 1){
      this.router.navigate(['../alta-responsable'], {queryParams:{idColegio:user.id_colegio}, relativeTo: this.activeRoute })
    }

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
      this.responsableService.obtenerResponsables()
    })
  }

  editar(Responsable:Usuario){
    const modalEditar = this.modalService.open(EditarMisDatosComponent,{backdrop:'static'})
    modalEditar.componentInstance.idUsuario = Responsable.id
    modalEditar.componentInstance.idRol = Responsable.id_rol
    modalEditar.result.then(r=>{
      if(r)
        this.responsableService.obtenerResponsables()
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
        { celular: this.busqueda },
        {
          id_colegio_colegio: {
            $or: [
              { cuit: this.busqueda },
              { nombre: this.busqueda },
            ]
          }
        }
      ]
    };
  }
}

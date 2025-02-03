import { shareReplay, Subscription, tap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColegioService } from 'src/servicios/colegio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/core/auth.service';
import { AdminService } from 'src/servicios/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfilUsuarioComponent } from 'src/standalone/perfil-usuario/perfil-usuario.component';
import { Usuario } from 'src/interfaces/usuario';
import { ConfirmarComponent } from 'src/standalone/confirmar/confirmar.component';
import { AutorizadoService } from 'src/servicios/autorizado.service';
import { DelegadoService } from 'src/servicios/delegado.service';
import { ResponsableService } from 'src/servicios/responsable.service';
import { RegistroService } from 'src/servicios/registro.service';
import { EditarMisDatosComponent } from 'src/standalone/editar-mis-datos/editar-mis-datos.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle-colegio',
  templateUrl: './detalle-colegio.component.html',
  styleUrls: ['./detalle-colegio.component.css']
})
export class DetalleColegioComponent implements OnInit, OnDestroy {
  apiFile=environment.fileUrl
  detalle$ = this.colegioService.colegioDetalle$.pipe(tap(r=>console.log(r)))
  registros$ = this.registroService.registros$
  private queryParamsSubscription: Subscription | undefined;
  idColegio = null

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private colegioService: ColegioService,
    private router: Router,
    private adminService:AdminService,
    private modalService:NgbModal,
    private registroService:RegistroService
  ) {}

  ngOnInit(): void {
    // Guardamos la suscripción para desuscribirla después
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.idColegio = params['id'];

      // Si el usuario tiene rol 0 (admin) y no tiene idColegio, lo redirigimos
      if (this.authService.getUserRole() === 0 && !this.idColegio) {
        this.router.navigate(['./']); // Ruta a la que deseas redirigirlo
        return; // Salimos para no ejecutar más código
      }

      // Si el usuario tiene rol 0 (admin) y tiene un idColegio, obtenemos los detalles
      if (this.authService.userHasRole([0]) && this.idColegio) {
        this.colegioService.obtenerDetalle(this.idColegio);
        this.registroService.obtenerRegistros(this.idColegio)
      }
      // Si el usuario no tiene rol 0 (es un usuario común), obtenemos los detalles sin idColegio
      else {
        this.colegioService.obtenerDetalle();
        if(this.authService.userHasRole([1,2]))
          this.registroService.obtenerRegistros()
      }
    });
  }

  // Limpiar la suscripción cuando el componente sea destruido
  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  reiniciarPassword(id:number){
    this.adminService.reiniciarPassword('user',id)
  }

  suspender(idResponsable:number){
    this.adminService.suspenderUsuario(idResponsable).subscribe(respuesta=>{
      if(this.idColegio){
        this.colegioService.obtenerDetalle(this.idColegio)
      }else{
        this.colegioService.obtenerDetalle()
      }
    }
    )
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
        this.eliminarUsuario(usuario.id, usuario.id_rol)
    })
  }

  private eliminarUsuario(idUsuario:number, idRol:number){
    this.adminService.eliminarUsuario(idUsuario).subscribe(respuesta=>{
      if(this.idColegio){
        this.colegioService.obtenerDetalle(this.idColegio)
      }else{
        this.colegioService.obtenerDetalle()
      }
    })
  }

  editar(usuario:Usuario){
    const modalEditar = this.modalService.open(EditarMisDatosComponent,{backdrop:'static'})
    modalEditar.componentInstance.idUsuario = usuario.id
    modalEditar.componentInstance.idRol = usuario.id_rol
    modalEditar.result.then(r=>{
      if(r && this.idColegio){
        this.colegioService.obtenerDetalle(this.idColegio)
      }

    })
  }

}

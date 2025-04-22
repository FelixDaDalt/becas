import { Router } from '@angular/router';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { shareReplay, tap } from 'rxjs';
import { AuthService } from 'src/core/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditarMisDatosComponent } from 'src/standalone/editar-mis-datos/editar-mis-datos.component';
import { usuarioService } from 'src/servicios/usuario.service';
import { CambioPassComponent } from 'src/standalone/cambio-pass/cambio-pass.component';
import { Usuario } from 'src/interfaces/usuario';
import { environment } from 'src/environments/environment';
import { NotificacionService } from 'src/servicios/notificacion.service';
import { RedService } from 'src/servicios/red.service';
import { MiSolicitud, Solicitud } from 'src/interfaces/notificaciones';
import { ReporteErrorComponent } from 'src/standalone/reporte-problema/reporte.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('navElement', { static: false }) navElement!: ElementRef;

  user$ = this.usuarioService.me$.pipe(shareReplay(1));
  apiFile=environment.fileUrl

  notificaciones$=this.notificacionesService.notificacion$.pipe(shareReplay(1),tap(r=>console.log(r)))
  notificacionesAdmin$=this.notificacionesService.notificacionAdmin$.pipe(shareReplay(1),tap(r=>console.log(r)))
  tabSeleccionado = 'misSolicitudes';

  constructor(private usuarioService: usuarioService,
    private router: Router,
    private modalService:NgbModal,
    private authService:AuthService,
    private notificacionesService:NotificacionService,
  private redService:RedService ) {
    (window as any).navegar = this.navegar.bind(this);
      this.usuarioService.obtenerMe()
      const idRol = this.authService.getUserRole()
      idRol == 0?this.notificacionesService.obtenerNotificacionesAdmin():
      this.notificacionesService.obtenerNotificaciones()
  }

  ngAfterViewInit(): void {
    const Scripts = (window as any).Scripts.instance;
    Scripts.navBase();
  }



  navegar(route: string, element: HTMLElement) {
    this.router.navigate([route]);
    this.active(element);
  }

  active(element: HTMLElement) {
    document
      .querySelectorAll('a')
      .forEach((el) => el.classList.remove('active'));
    element.classList.add('active');
  }

  editar(){
   const modalEditar = this.modalService.open(EditarMisDatosComponent)
  }

  cambiarPass(usuario:Usuario){
    const modalPass = this.modalService.open(CambioPassComponent)
    modalPass.componentInstance.usuario = usuario
    modalPass.componentInstance.alerta = false
    modalPass.result.then(r=>{
      if(r)
        this.logout()
    })
   }

   logout() {
    this.authService.logout();
  }

  verMiSolicitud(solicitud:MiSolicitud){
    this.redService.obtenerMeRed(solicitud.id_red)
    this.router.navigate(['dashboard/panel-red/mis-solicitudes/ver-solicitud'],{queryParams:{
      idRed:solicitud.id_red,idSolicitud:solicitud.id
    }})
  }

  verSolicitud(solicitud:Solicitud){
    this.redService.obtenerMeRed(solicitud.id_red)
    this.router.navigate(['dashboard/panel-red/solicitudes-recibidas/ver-solicitud'],{queryParams:{
      idRed:solicitud.id_red,idSolicitud:solicitud.id
    }})
  }

  reportar(){
      const tycModal = this.modalService.open(ReporteErrorComponent, {
        size: 'xl'
      });
    }
}

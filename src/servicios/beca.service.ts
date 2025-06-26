import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, shareReplay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RedService } from './red.service';
import { NotificacionService } from './notificacion.service';
import { Mis_solicitudes } from 'src/interfaces/panel_red/mis_solicitudes';
import { Beca } from 'src/interfaces/panel_red/beca';
import { Solicitudes } from 'src/interfaces/panel_red/solicitudes';
import { solicitud_detalle } from 'src/interfaces/panel_red/solicitud-detalle';
import { mi_solicitud_detalle } from 'src/interfaces/panel_red/mi-solicitud-detalle';

@Injectable({
  providedIn: 'root',
})
export class BecaService {
  private becasSubject = new BehaviorSubject<Beca[]>([]);
  becas$ = this.becasSubject.asObservable().pipe(shareReplay(1));

  private solicitudesSubject = new BehaviorSubject<Solicitudes[]>([]);
  solicitudes$ = this.solicitudesSubject.asObservable().pipe(shareReplay(1));

  private solicitudDetalleSubject = new BehaviorSubject<solicitud_detalle | null>(null);
  solicitudDetalle$ = this.solicitudDetalleSubject.asObservable().pipe(shareReplay(1));

  private misSolicitudesSubject = new BehaviorSubject<Mis_solicitudes[]>([]);
  misSolicitudes$ = this.misSolicitudesSubject.asObservable().pipe(shareReplay(1));

  private miSolicitudDetalleSubject = new BehaviorSubject<mi_solicitud_detalle | null>(null);
  miSolicitudDetalle$ = this.miSolicitudDetalleSubject.asObservable().pipe(shareReplay(1));

  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private redService:RedService,
    private notificacionService:NotificacionService
  ) {}

  private getBecas(idRed:number) {
    return this.http
      .get(`${environment.apiUrl}${environment.endpoint.beca.listado}?idRed=${idRed}`)
      .pipe(map((respuesta: any) => respuesta.data));
  }

  obtenerBecas(idRed:number) {
    this.getBecas(idRed)
      .pipe(take(1))
      .subscribe((Becas) => {
        this.becasSubject.next(Becas);
      });
  }

  altaBeca(beca: any, idRed:number): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}${environment.endpoint.beca.alta}?idRed=${idRed}`,
        beca
      )
      .pipe(
        take(1),
        tap((respuesta: any) => {
          this.toast.success(respuesta.mensaje);
          this.obtenerBecas(idRed)
        })
      );
  }

  solicitar(solicitud:any, idRed:number){
    return this.http
    .post(
      `${environment.apiUrl}${environment.endpoint.beca.solicitar}?idRed=${idRed}`,
      solicitud
    )
    .pipe(
      take(1),
      tap((respuesta: any) => {
        this.toast.success(respuesta.mensaje);
        this.obtenerBecas(idRed)
      })
    );
  }

  private getSolicitudes(idRed:number, idEstado:number) {
    return this.http
      .get(`${environment.apiUrl}${environment.endpoint.beca.solicitudes}?idRed=${idRed}&idEstado=${idEstado}`)
      .pipe(map((respuesta: any) => respuesta.data));
  }

  obtenerSolicitudes(idRed:number, idEstado:number) {
    this.getSolicitudes(idRed,idEstado)
      .pipe(take(1))
      .subscribe((solicitudes) => {
        this.solicitudesSubject.next(solicitudes);
      });
  }

  private getSolicitudDetalle(idRed:number, idSolicitud:number) {
    return this.http
      .get(`${environment.apiUrl}${environment.endpoint.beca.solicitud_detalle}?idRed=${idRed}&idSolicitud=${idSolicitud}`)
      .pipe(map((respuesta: any) => respuesta.data));
  }

  obtenerSolicitudDetalle(idRed:number,idSolicitud:number){
    this.getSolicitudDetalle(idRed,idSolicitud)
    .pipe(take(1))
    .subscribe((solicitud) => {
      this.notificacionService.obtenerNotificaciones();
      this.solicitudDetalleSubject.next(solicitud);
    });
  }

  private getMisSolicitudes(idRed:number, idEstado:number) {
    return this.http
      .get(`${environment.apiUrl}${environment.endpoint.beca.mis_solicitudes}?idRed=${idRed}&idEstado=${idEstado}`)
      .pipe(
        map((respuesta: any) => respuesta.data));
  }


  obtenerMisSolicitudes(idRed:number, idEstado:number) {
    this.getMisSolicitudes(idRed,idEstado)
      .pipe(take(1))
      .subscribe((solicitudes) => {
        this.misSolicitudesSubject.next(solicitudes);
      });
  }

  private getMiSolicitudDetalle(idRed:number, idSolicitud:number) {
    return this.http
      .get(`${environment.apiUrl}${environment.endpoint.beca.mi_solicitud_detalle}?idRed=${idRed}&idSolicitud=${idSolicitud}`)
      .pipe(map((respuesta: any) => respuesta.data));
  }

  obtenerMiSolicitudDetalle(idRed:number,idSolicitud:number){
    this.getMiSolicitudDetalle(idRed,idSolicitud)
    .pipe(take(1))
    .subscribe((solicitud) => {
      this.notificacionService.obtenerNotificaciones();
      this.miSolicitudDetalleSubject.next(solicitud);
    });
  }

  resolver(idRed:number,resolucion:any){
    return this.http
      .post(`${environment.apiUrl}${environment.endpoint.beca.resolver}?idRed=${idRed}`,resolucion)
      .pipe(
          take(1),
          map((respuesta: any) => respuesta.data),
          tap(()=>{
            this.obtenerSolicitudDetalle(idRed,resolucion.id_solicitud)
            this.obtenerSolicitudes(idRed,-1)
            this.redService.obtenerMeRed(idRed)
          })
        )

  }

  desestimar(idRed:number,desestimar:any){
    this.http
      .post(`${environment.apiUrl}${environment.endpoint.beca.desestimar}?idRed=${idRed}`,desestimar)
      .pipe(
        map((respuesta: any) => respuesta.data),
        take(1))
      .subscribe(respuesta=>{
        this.redService.obtenerMeRed(idRed)
        this.obtenerMiSolicitudDetalle(idRed,desestimar.id_solicitud)
        this.obtenerMisSolicitudes(idRed,-1)})

  }

  darBaja(idRed:number,desestimar:any,misSolicitudes:boolean){
    this.http
      .post(`${environment.apiUrl}${environment.endpoint.beca.dar_baja}?idRed=${idRed}`,desestimar)
      .pipe(
        map((respuesta: any) => respuesta.data),
        take(1))
      .subscribe(respuesta=>{
        this.redService.obtenerMeRed(idRed)
        if(!misSolicitudes){
          this.obtenerSolicitudDetalle(idRed,desestimar.id_solicitud)
          this.obtenerMisSolicitudes(idRed,0)
        }else{
          this.obtenerMiSolicitudDetalle(idRed,desestimar.id_solicitud)
          this.obtenerMisSolicitudes(idRed,0)
        }
      })
  }


}

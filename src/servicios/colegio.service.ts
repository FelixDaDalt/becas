import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, shareReplay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Colegio } from 'src/interfaces/colegio';
import { ComprobarService } from './comprobar.service';
import { ColegioDetalle } from 'src/interfaces/colegio_detalle';
import { ver_colegio } from 'src/interfaces/ver_colegio';


@Injectable({
  providedIn: 'root',
})
export class ColegioService {
  private colegiosSubject = new BehaviorSubject<Colegio[]>([]);
  colegios$ = this.colegiosSubject.asObservable().pipe(shareReplay(1));
  private colegioSubject = new BehaviorSubject<Colegio | null>(null);
  colegio$ = this.colegioSubject.asObservable().pipe(shareReplay(1));

  private colegioDetalleSubject = new BehaviorSubject<ColegioDetalle | null>(
    null
  );
  colegioDetalle$ = this.colegioDetalleSubject
    .asObservable()
    .pipe(shareReplay(1));

    private verColegioSubject = new BehaviorSubject<ver_colegio | null>(null);

    verColegio$ = this.verColegioSubject.asObservable().pipe(shareReplay(1));

  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private comprobarService: ComprobarService
  ) {}

  private getColegios() {
    return this.http
      .get(`${environment.apiUrl}${environment.endpoint.colegio.listado}`)
      .pipe(map((respuesta: any) => respuesta.data));
  }

  obtenerColegios() {
    this.getColegios()
      .pipe(take(1))
      .subscribe((colegios) => {
        this.colegiosSubject.next(colegios);
      });
  }

  suspenderColegio(idColegio: number) {
    this.http
      .put(
        `${environment.apiUrl}${environment.endpoint.colegio.suspender}?idColegio=${idColegio}`,
        null
      )
      .pipe(
        take(1),
        tap((respuesta: any) => {
          this.toast.success(respuesta.mensaje);
        })
      )
      .subscribe((respuesta) => this.obtenerColegios());
  }

  comprobarDni(dni: string): Observable<boolean> {
    return this.comprobarService.comprobarDni(dni);
  }

  comprobarCuit(cuit: string): Observable<boolean> {
    return this.comprobarService.comprobarCuit(cuit);
  }

  comprobarUrl(url: string): Observable<boolean> {
    return this.comprobarService.comprobarUrl(url);
  }

  altaColegio(nuevoColegio: any): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}${environment.endpoint.colegio.alta}`,
        nuevoColegio
      )
      .pipe(
        take(1),
        tap((respuesta: any) => {
          this.toast.success(respuesta.mensaje);
          this.obtenerColegios();
        })
      );
  }



  private getDetalle(idColegio?: number | string) {
    return this.http
      .get(
        `${environment.apiUrl}${environment.endpoint.colegio.detalle}${
          idColegio ? `?id=${idColegio}` : ''
        }`
      )
      .pipe(map((respuesta: any) => respuesta.data));
  }

  obtenerDetalle(idColegio?: number | string) {
    this.getDetalle(idColegio)
      .pipe(take(1))
      .subscribe((colegio) => this.colegioDetalleSubject.next(colegio));
  }

  eliminarColegio(idColegio:number){
    this.http.put(`${environment.apiUrl}${environment.endpoint.colegio.borrar}?idColegio=${idColegio}`,null)
    .pipe(
      take(1),
    ).subscribe((respuesta:any)=>{
      this.toast.success(respuesta.mensaje);
      this.obtenerColegios()
    })
  }

  editarColegio(colegio:any){
    return this.http.put(`${environment.apiUrl}${environment.endpoint.colegio.editar}`,colegio).pipe(
      take(1),
      tap((respuesta: any) => {
        this.toast.success(respuesta.mensaje)
        this.obtenerColegios()
      })
  )}

  private getVerColegio(idColegio?: number | string) {
    return this.http
      .get(
        `${environment.apiUrl}${environment.endpoint.colegio.ver_colegio}${
          idColegio ? `?id=${idColegio}` : ''
        }`
      )
      .pipe(
        map((respuesta: any) => respuesta.data));
  }

  verColegio(idColegio:number){
    this.getVerColegio(idColegio)
    .pipe(take(1))
    .subscribe((colegio) => this.verColegioSubject.next(colegio));
  }
}

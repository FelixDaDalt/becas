import { AuthService } from 'src/core/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, shareReplay, take, tap } from 'rxjs';
import { colegiosRed } from 'src/app/dashboard/paginas/pestañas/contenido/redes/editar-miembros/editar-miembros.component';

import { environment } from 'src/environments/environment';
import { Miembro } from 'src/interfaces/miembros';
import { listadoRedes, Red } from 'src/interfaces/red';


@Injectable({
  providedIn: 'root',
})
export class RedService {
  private redesSubject = new BehaviorSubject<listadoRedes|null>(null);
  redes$ = this.redesSubject.asObservable().pipe(shareReplay(1));

  private redSubject = new BehaviorSubject<Red | null>(null);
  red$ = this.redSubject.asObservable().pipe(shareReplay(1));

  private colegioDisponiblesSubject = new BehaviorSubject<colegiosRed | null>(null);
  colegioDisponibles$ = this.colegioDisponiblesSubject.asObservable().pipe(shareReplay(1));

  private miembrosSubject = new BehaviorSubject<Miembro[]>([]);
  miembros$ = this.miembrosSubject.asObservable().pipe(shareReplay(1));

  private meRedSubject = new BehaviorSubject<any>(null);
  meRed$ = this.meRedSubject.asObservable().pipe(shareReplay(1));

  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private authService:AuthService
  ) {}

  private getRedes() {
    return this.http
      .get(`${environment.apiUrl}${environment.endpoint.red.listado}`)
      .pipe(map((respuesta: any) => respuesta.data));
  }

  obtenerRedes() {
    this.getRedes()
      .pipe(take(1))
      .subscribe((redes) => {
        this.redesSubject.next(redes);
      });
  }

  eliminar(idRed:number){
    this.http.put(`${environment.apiUrl}${environment.endpoint.red.borrar}?idRed=${idRed}`,null)
    .pipe(
      take(1),
    ).subscribe((respuesta:any)=>{
      this.toast.success(respuesta.mensaje);
      this.obtenerRedes()
    })
  }

  altaRed(nuevaRed: any): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}${environment.endpoint.red.alta}`,
        nuevaRed
      )
      .pipe(
        take(1),
        tap((respuesta: any) => {
          this.toast.success(respuesta.mensaje);
          this.obtenerRedes();
        })
      );
  }

  editarRed(edicionRed: any): Observable<any> {
    return this.http
      .put(
        `${environment.apiUrl}${environment.endpoint.red.editarDatos}`,
        edicionRed
      )
      .pipe(
        take(1),
        tap((respuesta: any) => {
          this.toast.success(respuesta.mensaje);
          this.obtenerRedes();
        })
      );
  }

  private getRed(idRed:number): Observable <Red|null> {
    return this.http
      .get(`${environment.apiUrl}${environment.endpoint.red.obtener}?idRed=${idRed}`)
      .pipe(map((respuesta: any) => respuesta.data));
  }

  obtenerRed(idRed:number): Observable <Red|null> {
    return this.getRed(idRed)
      .pipe(take(1))
  }

  private getColegiosDisponibles(idRed:number) {
    return this.http
    .get(`${environment.apiUrl}${environment.endpoint.red.colegiosDisponibles}?idRed=${idRed}`)
    .pipe(map((respuesta: any) => respuesta.data));
  }

  obtenerColegiosDisponibles(idRed:number) {
   this.getColegiosDisponibles(idRed).pipe(take(1)).subscribe((disponibles) => {
    this.colegioDisponiblesSubject.next(disponibles);
  });
  }

  borrarMiembro(idRed:number, idColegio:number){
    this.http.put(`${environment.apiUrl}${environment.endpoint.red.borrarMiembro}?idRed=${idRed}&idColegio=${idColegio}`,null)
    .pipe(
      take(1),
    ).subscribe((respuesta:any)=>{
      this.toast.success(respuesta.mensaje);
      this.obtenerColegiosDisponibles(idRed)
    })
  }

  editarMiembros(miembros:any){
    return this.http.put(`${environment.apiUrl}${environment.endpoint.red.editarMiembros}`,miembros)
    .pipe(
      tap((respuesta:any)=>this.toast.success(respuesta.mensaje)),
      take(1)
    )
  }

  private getMiembros(idRed:number) {
    return this.http
    .get(`${environment.apiUrl}${environment.endpoint.red.obtenerMiembros}?idRed=${idRed}`)
    .pipe(map((respuesta: any) => respuesta.data));
  }

  obtenerMiembros(idRed:number) {
    this.getMiembros(idRed).pipe(take(1)).subscribe((miembros) => {
     this.miembrosSubject.next(miembros);
   });
  }

  private getRedMe(idRed:number){
    return this.http
    .get(`${environment.apiUrl}${environment.endpoint.red.meRed}?idRed=${idRed}`)
    .pipe(map((respuesta: any) => respuesta.data));
  }


  obtenerMeRed(idRed:number){
    if(this.authService.getUserRole()!=0)
    this.getRedMe(idRed).pipe(take(1)).subscribe((meRed) => {
      this.meRedSubject.next(meRed);
    });
  }
}

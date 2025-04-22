import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, shareReplay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Autorizado } from 'src/interfaces/autorizado';
import { Usuario } from 'src/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutorizadoService {

  private autorizadosSubject = new BehaviorSubject<Autorizado[]>([])
  autorizados$ = this.autorizadosSubject.asObservable().pipe(shareReplay(1))

  constructor(
    private http: HttpClient,
    private toast:ToastrService) {

  }

  private getAutorizados(){
    return this.http.get(`${environment.apiUrl}${environment.endpoint.autorizado.listado}`).pipe(
      map((respuesta:any) => respuesta.data))
  }

  obtenerAutorizados(){
      this.getAutorizados().pipe(take(1)).subscribe(
        autorizados=>{
          this.autorizadosSubject.next(autorizados)
        })
  }


  altaAutorizado(nuevoAutorizado: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}${environment.endpoint.autorizado.alta}`, nuevoAutorizado).pipe(
      take(1),
      tap((respuesta: any) => {
        this.toast.success(respuesta.mensaje);
        this.obtenerAutorizados()
      }),
    )
  }


  obtenerAutorizado(idUsuario:number){
    return this.http.get(`${environment.apiUrl}${environment.endpoint.autorizado.obtener}?idAutorizado=${idUsuario}`).pipe(
      take(1),
      map((respuesta: any) => respuesta.data)
  )}

  editarAutorizado(usuario:any){
    return this.http.put(`${environment.apiUrl}${environment.endpoint.autorizado.editar}`,usuario).pipe(
      take(1),
      tap((respuesta: any) => {
        this.toast.success(respuesta.mensaje)
      })
  )}

  suspenderAutorizado(idAutorizado: number) {
    return this.http
      .put(
        `${environment.apiUrl}${environment.endpoint.autorizado.suspender}?idAutorizado=${idAutorizado}`,
        null
      )
      .pipe(
        take(1),
        tap((respuesta: any) => {
          this.toast.success(respuesta.mensaje);
        })
      );
  }

  eliminarAutorizado(idUsuario:number){
    return this.http.put(`${environment.apiUrl}${environment.endpoint.autorizado.borrar}?idAutorizado=${idUsuario}`,null)
    .pipe(
      take(1),
      tap((respuesta: any) => {
        this.toast.success(respuesta.mensaje);
      })
    )
  }


}

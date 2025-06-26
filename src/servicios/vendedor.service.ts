import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, shareReplay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vendedor } from 'src/interfaces/vendedor';

@Injectable({
  providedIn: 'root'
})
export class vendedorService {

  private vendedoresSubject = new BehaviorSubject<Vendedor[]>([])
  vendedores$ = this.vendedoresSubject.asObservable().pipe(shareReplay(1))

  constructor(
    private http: HttpClient,
    private toast:ToastrService) {
      this.obtenerVendedores()
  }

  private getVendedores(){
    return this.http.get(`${environment.apiUrl}${environment.endpoint.vendedor.listado}`).pipe(
      map((respuesta:any) => respuesta.data))
  }

  obtenerVendedores(){
      this.getVendedores().pipe(take(1)).subscribe(
        vendedores=>{
          console.log(vendedores)
          this.vendedoresSubject.next(vendedores)
        })
  }


  altaVendedor(nuevoVendedor: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}${environment.endpoint.vendedor.alta}`, nuevoVendedor).pipe(
      take(1),
      tap((respuesta: any) => {
        this.toast.success(respuesta.mensaje);
        this.obtenerVendedores()
      }),
    )
  }


  obtenerVendedor(idUsuario:number){
    return this.http.get(`${environment.apiUrl}${environment.endpoint.vendedor.obtener}?idVendedor=${idUsuario}`).pipe(
      take(1),
      map((respuesta: any) => respuesta.data)
  )}

  editarVendedor(usuario:any){
    return this.http.put(`${environment.apiUrl}${environment.endpoint.vendedor.editar}`,usuario).pipe(
      take(1),
      tap((respuesta: any) => {
        this.toast.success(respuesta.mensaje)
      })
  )}

  suspenderVendedor(idVendedor: number) {
    return this.http
      .put(
        `${environment.apiUrl}${environment.endpoint.vendedor.suspender}?idVendedor=${idVendedor}`,
        null
      )
      .pipe(
        take(1),
        tap((respuesta: any) => {
          this.toast.success(respuesta.mensaje);
        })
      );
  }

  eliminarVendedor(idUsuario:number){
    return this.http.put(`${environment.apiUrl}${environment.endpoint.vendedor.borrar}?idVendedor=${idUsuario}`,null)
    .pipe(
      take(1),
      tap((respuesta: any) => {
        this.toast.success(respuesta.mensaje);
        this.obtenerVendedores()
      })
    )
  }


}

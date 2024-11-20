import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, shareReplay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class DelegadoService {

  private delegadosSubject = new BehaviorSubject<Usuario[]>([])
  delegados$ = this.delegadosSubject.asObservable().pipe(shareReplay(1))

  constructor(
    private http: HttpClient,
    private toast:ToastrService) {

  }

  private getdelegados(){
    return this.http.get(`${environment.apiUrl}${environment.endpoint.delegado.listado}`).pipe(
      map((respuesta:any) => respuesta.data))
  }

  obtenerDelegados(){
      this.getdelegados().pipe(take(1)).subscribe(
        delegados=>{
          this.delegadosSubject.next(delegados)
        })
  }


  altaDelegado(nuevoDelegado: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}${environment.endpoint.delegado.alta}`, nuevoDelegado).pipe(
      take(1),
      tap((respuesta: any) => {
        this.toast.success(respuesta.mensaje);
        this.obtenerDelegados()
      }),
    )
  }


}

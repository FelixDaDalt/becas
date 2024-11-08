import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, shareReplay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  private resposablesSubject = new BehaviorSubject<Usuario[]>([])
  responsables$ = this.resposablesSubject.asObservable().pipe(shareReplay(1))

  constructor(
    private http: HttpClient,
    private toast:ToastrService) {

  }

  private getResponsables(){
    return this.http.get(`${environment.apiUrl}${environment.endpoint.responsable.listado}`).pipe(
      map((respuesta:any) => respuesta.data))
  }

  obtenerResponsables(){
      this.getResponsables().pipe(take(1)).subscribe(
        responsables=>{
          this.resposablesSubject.next(responsables)
        })
  }


  altaResponsable(nuevoResponsable: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}${environment.endpoint.responsable.alta}`, nuevoResponsable).pipe(
      take(1),
      tap((respuesta: any) => {
        this.toast.success(respuesta.mensaje);
        this.obtenerResponsables()
      }),
    )
  }


}

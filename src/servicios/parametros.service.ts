import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, shareReplay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  private parametrosSubject = new BehaviorSubject<any[]>([])
  parametros$ = this.parametrosSubject.asObservable().pipe(shareReplay(1))

  constructor(private http: HttpClient,
    private toast:ToastrService) {
      this.obtenerparametros()
  }

  private getparametros(){
      return this.http.get(`${environment.apiUrl}${environment.endpoint.parametros.obtener}`).pipe(
        map((respuesta:any) => respuesta.data))
  }

  private obtenerparametros(){
      this.getparametros().pipe(take(1)).subscribe(
        parametros => {
          this.parametrosSubject.next(parametros)
        }
      )
  }



  actualizarparametro(parametroEditada:any){
    this.http.put(`${environment.apiUrl}${environment.endpoint.parametros.actualizar}`,parametroEditada).pipe(
      take(1)).subscribe((respuesta:any)=>{
        this.toast.success(respuesta.mensaje)
        this.obtenerparametros()
      })
  }

}

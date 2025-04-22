import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, shareReplay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { plan } from 'src/interfaces/plan';


@Injectable({
  providedIn: 'root'
})
export class PlanesService {
  private cacheplanes=false
  private planesSubject = new BehaviorSubject<plan[]>([])
  planes$ = this.planesSubject.asObservable().pipe(shareReplay(1))

  constructor(private http: HttpClient,
    private toast:ToastrService) {
      this.obtenerplanes()
  }

  private getplanes(){
      return this.http.get(`${environment.apiUrl}${environment.endpoint.plan.obtener}`).pipe(
        map((respuesta:any) => respuesta.data))
  }

  private obtenerplanes(){
    if(!this.cacheplanes){
      this.getplanes().pipe(take(1)).subscribe(
        planes => {
          this.planesSubject.next(planes),
          this.cacheplanes = true
        }
      )
    }
  }

  actualizarListado(){
    this.cacheplanes = false
    this.obtenerplanes()
  }



  nuevoplan(nuevaplan:plan){
    return this.http.post(`${environment.apiUrl}${environment.endpoint.plan.nueva}`,nuevaplan).pipe(
      take(1),
      tap((respuesta:any)=>{
        this.toast.success(respuesta.mensaje)
        this.actualizarListado()
      }))
  }

  actualizarplan(planEditada:plan){
    return this.http.put(`${environment.apiUrl}${environment.endpoint.plan.actualizar}`,planEditada).pipe(
      take(1),
      tap((respuesta:any)=>{
        this.toast.success(respuesta.mensaje)
        this.actualizarListado()
      }))
  }

  borrarplan(idplan:number){
    this.http.put(`${environment.apiUrl}${environment.endpoint.plan.borrar}?id=${idplan}`,null).pipe(
      take(1)).subscribe((respuesta:any)=>{
        this.toast.success(respuesta.mensaje)
        this.actualizarListado()
      })
  }
}

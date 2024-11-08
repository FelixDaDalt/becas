import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, shareReplay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { zona_localidad, zona } from 'src/interfaces/zona';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {
  private cacheZonas=false
  private zonasSubject = new BehaviorSubject<zona[]>([])
  zonas$ = this.zonasSubject.asObservable().pipe(shareReplay(1))

  constructor(private http: HttpClient,
    private toast:ToastrService) {
      this.obtenerZonas()
  }

  private getZonas(){
      return this.http.get(`${environment.apiUrl}${environment.endpoint.zona.obtener}`).pipe(
        map((respuesta:any) => respuesta.data))
  }

  private obtenerZonas(){
    if(!this.cacheZonas){
      this.getZonas().pipe(take(1)).subscribe(
        zonas => {
          this.zonasSubject.next(zonas),
          this.cacheZonas = true
        }
      )
    }
  }

  actualizarListado(){
    this.cacheZonas = false
    this.obtenerZonas()
  }



  nuevaZona(nuevaZona:zona){
    this.http.post(`${environment.apiUrl}${environment.endpoint.zona.nueva}`,nuevaZona).pipe(
      take(1)).subscribe((respuesta:any)=>{
        this.toast.success(respuesta.mensaje)
        this.actualizarListado()
      })
  }

  actualizarZona(zonaEditada:zona){
    this.http.put(`${environment.apiUrl}${environment.endpoint.zona.actualizar}`,zonaEditada).pipe(
      take(1)).subscribe((respuesta:any)=>{
        this.toast.success(respuesta.mensaje)
        this.actualizarListado()
      })
  }

  borrarZona(idZona:number){
    this.http.put(`${environment.apiUrl}${environment.endpoint.zona.borrar}?id=${idZona}`,null).pipe(
      take(1)).subscribe((respuesta:any)=>{
        this.toast.success(respuesta.mensaje)
        this.actualizarListado()
      })
  }


  //LOCALIDADES
  nuevaLocalidad(nuevaLocalidad:zona_localidad){
    this.http.post(`${environment.apiUrl}${environment.endpoint.localidad.nueva}`,nuevaLocalidad).pipe(
      take(1)).subscribe((respuesta:any)=>{
        this.toast.success(respuesta.mensaje)
        this.actualizarListado()
      })
  }

  actualizarLocalidad(localidadEditada:zona_localidad){
    this.http.put(`${environment.apiUrl}${environment.endpoint.localidad.actualizar}`,localidadEditada).pipe(
      take(1)).subscribe((respuesta:any)=>{
        this.toast.success(respuesta.mensaje)
        this.actualizarListado()
      })
  }

  borrarLocalidad(idLocalidad:number){
    this.http.put(`${environment.apiUrl}${environment.endpoint.localidad.borrar}?id=${idLocalidad}`,null).pipe(
      take(1)).subscribe((respuesta:any)=>{
        this.toast.success(respuesta.mensaje)
        this.actualizarListado()
      })
  }
}

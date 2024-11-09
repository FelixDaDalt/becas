import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, shareReplay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { tyc } from 'src/standalone/terminos/tyc';


@Injectable({
  providedIn: 'root'
})
export class TerminosService {


  private tycSubject = new BehaviorSubject<tyc | null>(null)
  tyc$ = this.tycSubject.asObservable().pipe(shareReplay(1))
  private tycHistorialSubject = new BehaviorSubject<tyc[]>([])
  tycHistorial$ = this.tycHistorialSubject.asObservable().pipe(shareReplay(1))

  constructor(private http: HttpClient, private toast:ToastrService) {

  }

  private getTyC(){
    return this.http.get(`${environment.apiUrl}${environment.endpoint.usuario.tyc}`).pipe(
      map((respuesta:any) => respuesta.data))
  }

  obtenerTyC(){
      this.getTyC().pipe(take(1)).subscribe(
        tyc=>{
          this.tycSubject.next(tyc)
        })
  }

  private getHistorialTyC(){
    return this.http.get(`${environment.apiUrl}${environment.endpoint.admin.tyc_historial}`).pipe(
      map((respuesta:any) => respuesta.data))
  }

  obtenerHistorialTyC(){
      this.getHistorialTyC().pipe(take(1)).subscribe(
        historialTyc=>{
          this.tycHistorialSubject.next(historialTyc)})
  }

  enviarTyc(tyc:any){
    return this.http.post(`${environment.apiUrl}${environment.endpoint.admin.tyc_alta}`,tyc).pipe(
      take(1),
      tap((respuesta:any)=> {
        this.toast.success(respuesta.mensaje),
        this.obtenerHistorialTyC()
      }),
      map((respuesta:any) => respuesta.data))
  }
}

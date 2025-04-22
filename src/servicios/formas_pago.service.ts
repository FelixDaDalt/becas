import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, shareReplay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { forma_pagos } from 'src/interfaces/forma_pagos';
import { plan } from 'src/interfaces/plan';


@Injectable({
  providedIn: 'root'
})
export class FormasPagoService {
  private cachepagos=false
  private pagosSubject = new BehaviorSubject<forma_pagos[]>([])
  pagos$ = this.pagosSubject.asObservable().pipe(shareReplay(1))

  constructor(private http: HttpClient,
    private toast:ToastrService) {
      this.obtenerpagos()
  }

  private getpagos(){
      return this.http.get(`${environment.apiUrl}${environment.endpoint.pagos.obtener}`).pipe(
        map((respuesta:any) => respuesta.data))
  }

  private obtenerpagos(){
    if(!this.cachepagos){
      this.getpagos().pipe(take(1)).subscribe(
        pagos => {
          this.pagosSubject.next(pagos),
          this.cachepagos = true
        }
      )
    }
  }

  actualizarListado(){
    this.cachepagos = false
    this.obtenerpagos()
  }

  actualizarpagos(pagoEditado:forma_pagos){
    return this.http.put(`${environment.apiUrl}${environment.endpoint.pagos.actualizar}`,pagoEditado).pipe(
      take(1),
      tap((respuesta:any)=>{
        this.toast.success(respuesta.mensaje)
        this.actualizarListado()
      }))
  }

}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, take, tap, BehaviorSubject, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(
      private http: HttpClient,
      private toast:ToastrService) {

    }

    private procesarBaja(){
      return this.http.post(`${environment.apiUrl}${environment.endpoint.tareas.forzarBaja}`,null).pipe(
        tap((respuesta:any)=>this.toast.success(respuesta.mensaje)),
        map((respuesta:any) => respuesta.data))
    }

    ejecutarBajas(){
        return this.procesarBaja().pipe(take(1))
    }

    private procesarPorVencer(){
      return this.http.post(`${environment.apiUrl}${environment.endpoint.tareas.notificarPorVencer}`,null).pipe(
        tap((respuesta:any)=>this.toast.success(respuesta.mensaje)),
        map((respuesta:any) => respuesta.data))
    }

    ejecutarPorVencer(){
        return this.procesarPorVencer().pipe(take(1))
    }

    private procesarVencidas(){
      return this.http.post(`${environment.apiUrl}${environment.endpoint.tareas.notificarVencidas}`,null).pipe(
        tap((respuesta:any)=>this.toast.success(respuesta.mensaje)),
        map((respuesta:any) => respuesta.data))
    }

    ejecutarVencidas(){
        return this.procesarVencidas().pipe(take(1))
    }

    obtenerEjecuciones(filtros: {
      tipo?: string[],
      fechaDesde?: string,
      fechaHasta?: string,
      page: number,
      pageSize: number
    }) {
      const params: any = {
        page: filtros.page,
        pageSize: filtros.pageSize,
      };

      if (filtros.fechaDesde) params.fechaDesde = filtros.fechaDesde;
      if (filtros.fechaHasta) params.fechaHasta = filtros.fechaHasta;
      if (filtros.tipo && filtros.tipo.length > 0) params.tipos = filtros.tipo;

      return this.http.get(`${environment.apiUrl}${environment.endpoint.tareas.obtenerEjecuciones}`, { params }).pipe(
        map((respuesta: any) => respuesta.data)
      );
    }


    comprobarRed(idRed?: number) {
      let params = new HttpParams();
      if (idRed !== undefined && idRed !== null) {
        params = params.set('idRed', idRed.toString());
      }

      return this.http.get(`${environment.apiUrl}${environment.endpoint.tareas.comprobarRed}`, { params }).pipe(
        map((respuesta: any) => respuesta.data)
      );
    }

    sincronizarRed(idRed:number){
      return this.http.get(`${environment.apiUrl}${environment.endpoint.tareas.sincronizarRed}?idRed=${idRed}`).pipe(
        map((respuesta:any) => respuesta.data))
    }


}

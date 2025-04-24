import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, shareReplay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Autorizado } from 'src/interfaces/autorizado';
import { reporte_error } from 'src/interfaces/reporte_error';
import { Usuario } from 'src/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private reportesSubject = new BehaviorSubject<reporte_error[]>([])
  reportes$ = this.reportesSubject.asObservable().pipe(shareReplay(1))

  constructor(
    private http: HttpClient,
    private toast:ToastrService) {

  }


  obtenerReportes(filtros: {
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

    return this.http.get(`${environment.apiUrl}${environment.endpoint.reporte.listado}`, { params }).pipe(
      map((respuesta: any) => respuesta.data)
    );
  }


  altaReporte(nuevoReporte: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}${environment.endpoint.reporte.alta}`, nuevoReporte).pipe(
      take(1),
      tap((respuesta: any) => {
        this.toast.success(respuesta.mensaje);
      }),
    )
  }


  eliminarReporte(idReporte:number){
    return this.http.put(`${environment.apiUrl}${environment.endpoint.reporte.borrar}?idReporte=${idReporte}`,null)
    .pipe(
      take(1),
      tap((respuesta: any) => {
        this.toast.success(respuesta.mensaje);
      })
    )
  }


}

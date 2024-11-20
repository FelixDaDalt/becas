import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, shareReplay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Registro } from 'src/interfaces/registro';
import { Usuario } from 'src/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private registrosSubject = new BehaviorSubject<Registro | undefined>(undefined)
  registros$ = this.registrosSubject.asObservable().pipe(shareReplay(1))

  private registrosAdminSubject = new BehaviorSubject<Registro | undefined>(undefined)
  registrosAdmin$ = this.registrosAdminSubject.asObservable().pipe(shareReplay(1))

  constructor(
    private http: HttpClient,
    private toast:ToastrService) {

  }

  private getRegistros(idColegio?:number){
    return this.http.get(`${environment.apiUrl}${environment.endpoint.registro.listado}${
          idColegio ? `?idColegio=${idColegio}` : ''
        }`).pipe(
      map((respuesta:any) => respuesta.data))
  }

  obtenerRegistros(idColegio?:number){
      this.getRegistros(idColegio).pipe(take(1)).subscribe(
        registros=>{
          this.registrosSubject.next(registros)
        })
  }

}

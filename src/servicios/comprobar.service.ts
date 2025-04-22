import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComprobarService {

  constructor(private http: HttpClient) { }

  comprobarDni(dni:string) : Observable<boolean>{
    return this.http.get<{ disponible: boolean }>(`${environment.apiUrl}${environment.endpoint.admin.comprobar}?dniAutorizado=${dni}`).pipe(
      map(
        (respuesta:any) => respuesta.disponible
      ),
      take(1))
  }

  comprobarCuit(cuit:string) : Observable<boolean>{
    return this.http.get<{ disponible: boolean }>(`${environment.apiUrl}${environment.endpoint.admin.comprobar}?cuit=${cuit}`).pipe(
      map(
        (respuesta:any) => respuesta.disponible
      ),
      take(1))
  }

  comprobarUrl(url:string) : Observable<boolean>{
    return this.http.get<{ disponible: boolean }>(`${environment.apiUrl}${environment.endpoint.admin.comprobar}?url=${url}`).pipe(
      map(
        (respuesta:any) => respuesta.disponible
      ),
      take(1))
  }
}

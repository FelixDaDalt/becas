import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, shareReplay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { administrador } from 'src/interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private administradoresSubject = new BehaviorSubject<administrador[]>([]);
  administradores$ = this.administradoresSubject
    .asObservable()
    .pipe(shareReplay(1));


  constructor(private http: HttpClient, private toast: ToastrService) {}

  private getAdministradores() {
    return this.http
      .get(`${environment.apiUrl}${environment.endpoint.admin.listado}`)
      .pipe(map((respuesta: any) => respuesta.data));
  }

  obtenerAdministradores() {
    this.getAdministradores()
      .pipe(take(1))
      .subscribe((administradores) => {
        this.administradoresSubject.next(administradores);
      });
  }

  altaAdministrador(nuevoAdministrador: any): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}${environment.endpoint.admin.alta}`,
        nuevoAdministrador
      )
      .pipe(
        take(1),
        tap((respuesta: any) => {
          this.toast.success(respuesta.mensaje);
          this.obtenerAdministradores()
        })
      );
  }

  suspenderAdministrador(idAdmin: number) {
    this.http.put(`${environment.apiUrl}${environment.endpoint.admin.suspender}?idAdmin=${idAdmin}`,null)
    .pipe(
      take(1)
    ).subscribe((respuesta:any)=>{
      this.toast.success(respuesta.mensaje);
      this.obtenerAdministradores()
    })
  }

  obtenerAdmin(idAdmin:number){
    return this.http.get(`${environment.apiUrl}${environment.endpoint.admin.obtener}?idAdmin=${idAdmin}`).pipe(
      take(1),
      map((respuesta: any) => respuesta.data))
  }

  eliminarAdmin(idAdmin:number){
    this.http.put(`${environment.apiUrl}${environment.endpoint.admin.borrar}?idAdmin=${idAdmin}`,null)
    .pipe(
      take(1),
    ).subscribe((respuesta:any)=>{
      this.toast.success(respuesta.mensaje);
      this.obtenerAdministradores()
    })
  }


  comprobarDni(dni: string): Observable<boolean> {
    return this.http
      .get<{ disponible: boolean }>(
        `${environment.apiUrl}${environment.endpoint.admin.comprobar}?dniAdmin=${dni}`
      )
      .pipe(
        map((respuesta: any) => respuesta.disponible),
        take(1)
      );
  }



  reiniciarPassword(tipo: string, id: number | string) {
    this.http.put<{ disponible: boolean }>(`${environment.apiUrl}${environment.endpoint.usuario.resetearPass}?${tipo}=${id}`,null)
    .pipe(
      take(1),
    ).subscribe((respuesta:any)=>{
        this.toast.success(respuesta.mensaje);
    });
  }

  suspenderUsuario(idUsuario: number) {
    return this.http
      .put(
        `${environment.apiUrl}${environment.endpoint.usuario.suspender}?id=${idUsuario}`,
        null
      )
      .pipe(
        take(1),
        tap((respuesta: any) => {
          this.toast.success(respuesta.mensaje);
        })
      );
  }

  eliminarUsuario(idUsuario:number){
    return this.http.put(`${environment.apiUrl}${environment.endpoint.usuario.borrar}?id=${idUsuario}`,null)
    .pipe(
      take(1),
      tap((respuesta: any) => {
        this.toast.success(respuesta.mensaje);
      })
    )
  }


}

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

  reiniciarPassword(tipo: string, id: number | string) {
    this.http
      .get<{ disponible: boolean }>(
        `${environment.apiUrl}${environment.endpoint.usuario.resetearPass}?${tipo}=${id}`
      )
      .pipe(
        take(1),
        tap((respuesta: any) => {
          this.toast.success(respuesta.mensaje);
        })
      )
      .subscribe();
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
}

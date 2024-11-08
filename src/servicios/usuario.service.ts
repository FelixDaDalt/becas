import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class usuarioService {

  private readonly aceptarTYC='usuario/aceptarTyc'
  private readonly cambiarPass='usuario/cambiarPassword'

  constructor(private http: HttpClient,private toast:ToastrService) { }

  cambiarPassword(password:any){
    return this.http.put(`${environment.apiUrl}${environment.endpoint.usuario.cambiarPassword}`,password).pipe(
      take(1),
      tap((respuesta: any) => {
        this.toast.success(respuesta.mensaje);
      }),
    )
  }

  aceptarTyc(password:any){
    return this.http.put(`${environment.apiUrl}${environment.endpoint.usuario.tyc_aceptar}`,password).pipe(
      take(1),
      tap((respuesta: any) => {
        this.toast.success(respuesta.mensaje);
      }),
    )
  }
}

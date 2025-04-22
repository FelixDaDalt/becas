import { AuthService } from 'src/core/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, shareReplay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class usuarioService {

  private readonly aceptarTYC='usuario/aceptarTyc'
  private readonly cambiarPass='usuario/cambiarPassword'

  private meSubject = new BehaviorSubject<Usuario | null>(null)
  me$ = this.meSubject.asObservable().pipe(shareReplay(1))

  constructor(private http: HttpClient,
    private toast:ToastrService,
    private authService:AuthService) { }

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

  obtenerUsuario(idUsuario:number){
    return this.http.get(`${environment.apiUrl}${environment.endpoint.usuario.obtener}?idUsuario=${idUsuario}`).pipe(
      take(1),
      map((respuesta: any) => respuesta.data)
  )}

  editarUsuario(usuario:any,idRol:number){
    const endpoint = idRol == 0?
    `${environment.apiUrl}${environment.endpoint.admin.editar}`: `${environment.apiUrl}${environment.endpoint.usuario.editar}`

    const idUsuarioLogueado = this.authService.getUser().id
    const idUsuario = usuario.get('usuario[id]')

    return this.http.put(endpoint,usuario).pipe(
      take(1),
      tap((respuesta: any) => {
        this.toast.success(respuesta.mensaje)
        if(idUsuarioLogueado==idUsuario)
          this.obtenerMe()
      })
  )}

  private me(){
    const endpoint = this.authService.getUserRole() <= 0?
    `${environment.apiUrl}${environment.endpoint.admin.me}`: `${environment.apiUrl}${environment.endpoint.usuario.me}`
    return this.http.get(endpoint).pipe(
      take(1),
      map((respuesta: any) => respuesta.data))

  }

  obtenerMe(){
    this.me().pipe(take(1)).subscribe(
      usuario=>{
        this.meSubject.next(usuario)
      })
  }
}

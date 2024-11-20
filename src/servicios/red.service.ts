import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map, Observable, shareReplay, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { listadoRedes, Red } from 'src/interfaces/red';


@Injectable({
  providedIn: 'root',
})
export class RedService {
  private redesSubject = new BehaviorSubject<listadoRedes|null>(null);
  redes$ = this.redesSubject.asObservable().pipe(shareReplay(1));

  constructor(
    private http: HttpClient,
    private toast: ToastrService
  ) {}

  private getRedes() {
    return this.http
      .get(`${environment.apiUrl}${environment.endpoint.red.listado}`)
      .pipe(map((respuesta: any) => respuesta.data));
  }

  obtenerRedes() {
    this.getRedes()
      .pipe(take(1))
      .subscribe((redes) => {
        this.redesSubject.next(redes);
      });
  }

  eliminar(idRed:number){
    this.http.put(`${environment.apiUrl}${environment.endpoint.red.borrar}?idRed=${idRed}`,null)
    .pipe(
      take(1),
    ).subscribe((respuesta:any)=>{
      this.toast.success(respuesta.mensaje);
      this.obtenerRedes()
    })
  }



  altaRed(nuevaRed: any): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}${environment.endpoint.red.alta}`,
        nuevaRed
      )
      .pipe(
        take(1),
        tap((respuesta: any) => {
          this.toast.success(respuesta.mensaje);
          this.obtenerRedes();
        })
      );
  }

}

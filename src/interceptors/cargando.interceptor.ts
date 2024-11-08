import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import { CargandoService } from 'src/servicios/cargando.service';


@Injectable()
export class CargandoInterceptor implements HttpInterceptor {
  constructor(private cargandoService: CargandoService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.cargandoService.setLoading(true); // Activar loading al iniciar la solicitud

    return next.handle(request).pipe(
      tap({
        next: () => {
          this.cargandoService.setLoading(false); // Desactivar loading al completar la solicitud
        },
        error: () => {
          this.cargandoService.setLoading(false); // Desactivar loading en caso de error
        }
      })
    );
  }
}

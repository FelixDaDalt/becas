import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable} from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { CargandoService } from 'src/servicios/cargando.service';


@Injectable()
export class CargandoInterceptor implements HttpInterceptor {
  constructor(private cargandoService: CargandoService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.cargandoService.setLoading(true); // Activar loading al iniciar la solicitud

    return next.handle(request).pipe(
      finalize(() => {
        setTimeout(() => this.cargandoService.setLoading(false), 500) // Se ejecuta siempre al finalizar la solicitud
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable} from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { CargandoService } from 'src/servicios/cargando.service';


@Injectable()
export class CargandoInterceptor implements HttpInterceptor {
  constructor(private cargandoService: CargandoService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const excluirLoading = request.url.includes('/notificacion');

    if (!excluirLoading) {
      this.cargandoService.setLoading(true);
    }

    return next.handle(request).pipe(
      finalize(() => {
        if (!excluirLoading) {
          setTimeout(() => this.cargandoService.setLoading(false), 100);
        }
      })
    );
  }
}


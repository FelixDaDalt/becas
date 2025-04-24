import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RedService } from 'src/core/red.service';


@Injectable()
export class RedInterceptor implements HttpInterceptor {
  constructor(private redService: RedService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.redService.isOnline) {
      return throwError(() => new HttpErrorResponse({
        error: 'Sin conexión a Internet',
        status: 0,
        statusText: 'Offline'
      }));
    }

    return next.handle(req);
  }
}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/auth.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toast:ToastrService, private router:Router, private authService:AuthService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        // Manejo del error aquí
        let errorMessage = '';
        let errorTitle = '';

        if (error.error instanceof ErrorEvent) {
          // Errores del lado del cliente
          errorMessage = `${error.error.message}`;
        } else {
          // Errores del lado del servidor
          errorTitle = `${error.error.Error}`;
          errorMessage = `${error.error.Descripcion}`;
        }

        // Puedes mostrar un mensaje en la consola o en un servicio de notificaciones
        this.toast.error(errorMessage, errorTitle)

        if (error.status === 401) { // Si el error es 401
          const userRole = this.authService.getUserRole();

          // Redirigir según el rol
          if (userRole === 0) {
            this.router.navigate(['/admin/login']);
          } else {
            this.router.navigate(['/login']);
          }
         }

        // Lanzar el error para que otros interceptores o componentes puedan manejarlo
        return throwError(error);
      })
    );
  }
}

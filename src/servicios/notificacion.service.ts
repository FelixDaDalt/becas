
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Subject, Subscription, interval } from 'rxjs';
import { switchMap, takeUntil, shareReplay, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Notificacion } from 'src/interfaces/notificaciones';
import { AuthService } from 'src/core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService{

  private notificacionSubject = new BehaviorSubject<Notificacion | null>(null);
  notificacion$ = this.notificacionSubject.asObservable().pipe(shareReplay(1));

  private notificacionAdminSubject = new BehaviorSubject<any | null>(null);
  notificacionAdmin$ = this.notificacionAdminSubject.asObservable().pipe(shareReplay(1));

  private pollingSub?: Subscription;

  constructor(private http: HttpClient, private authService:AuthService) {
    this.iniciarPolling();
  }

  private notificaciones() {
    return this.http.get(environment.apiUrl + environment.endpoint.notificaciones.listado)
      .pipe(switchMap((respuesta: any) => [respuesta.data]));
  }

  private notificacionesAdmin() {
    return this.http.get(  environment.apiUrl + environment.endpoint.notificaciones.admin)
      .pipe(switchMap((respuesta: any) => [respuesta.data]));
  }


  private iniciarPolling() {
    this.pollingSub?.unsubscribe();

    const idRol = this.authService.getUserRole();

    this.pollingSub = this.authService.isAuthenticated$
    .pipe(
      switchMap((autenticado) => {
        if (!autenticado) return EMPTY;
        return interval(60000).pipe(
          switchMap(() => idRol === 0 ? this.notificacionesAdmin() : this.notificaciones())
        );
      })
    )
    .subscribe((notificaciones) => {
      if (idRol === 0) {
        this.notificacionAdminSubject.next(notificaciones);
      } else {
        this.notificacionSubject.next(notificaciones);
      }
    });
  }


  obtenerNotificaciones() {
    this.notificaciones().pipe(take(1)).subscribe(
      notificaciones => {
        this.notificacionSubject.next(notificaciones); // Actualiza las notificaciones manualmente
      }
    );
  }

  obtenerNotificacionesAdmin() {
    this.notificacionesAdmin().pipe(take(1)).subscribe(
      notificaciones => {
        this.notificacionAdminSubject.next(notificaciones); // Actualiza las notificaciones manualmente
      }
    );
  }
}

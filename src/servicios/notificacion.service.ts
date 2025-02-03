
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, interval } from 'rxjs';
import { switchMap, takeUntil, shareReplay, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Notificacion } from 'src/interfaces/notificaciones';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService implements OnDestroy {

  private notificacionSubject = new BehaviorSubject<Notificacion | null>(null);
  notificacion$ = this.notificacionSubject.asObservable().pipe(shareReplay(1));
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {
    this.iniciarPolling();
  }

  private notificaciones() {
    return this.http.get(environment.apiUrl + environment.endpoint.notificaciones.listado)
      .pipe(switchMap((respuesta: any) => [respuesta.data]));
  }

  private iniciarPolling() {
    interval(60000)
      .pipe(
        switchMap(() => this.notificaciones()),
        takeUntil(this.destroy$)
      )
      .subscribe(notificaciones => this.notificacionSubject.next(notificaciones));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  obtenerNotificaciones() {
    this.notificaciones().pipe(take(1)).subscribe(
      notificaciones => {
        this.notificacionSubject.next(notificaciones); // Actualiza las notificaciones manualmente
      }
    );
  }
}

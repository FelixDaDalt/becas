import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, of } from 'rxjs';
import { mapTo, startWith } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RedService {

  private status$ = new BehaviorSubject<boolean>(navigator.onLine);

  constructor(private ngZone: NgZone) {
    this.monitorNetworkStatus();
  }

  private monitorNetworkStatus() {
    const online$ = fromEvent(window, 'online').pipe(mapTo(true));
    const offline$ = fromEvent(window, 'offline').pipe(mapTo(false));

    merge(online$, offline$)
      .pipe(startWith(navigator.onLine))
      .subscribe(status => {
        this.ngZone.run(() => this.status$.next(status));
      });
  }

  get isOnline$() {
    return this.status$.asObservable();
  }

   // método desde el interceptor
   get isOnline(): boolean {
    return this.status$.getValue();
  }
}

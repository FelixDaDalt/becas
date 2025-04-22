import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, take, tap, BehaviorSubject, shareReplay } from 'rxjs';
import { Dashboard } from 'src/app/dashboard/paginas/pestañas/contenido/dashboard/dashboard';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardSubject = new BehaviorSubject<Dashboard|null>(null)
  dashboard$ = this.dashboardSubject.asObservable().pipe(shareReplay(1))

  constructor(
      private http: HttpClient,
      private toast:ToastrService) {
        this.obtenerDashboard()
    }

    private getDashboard() {
      return this.http.get(`${environment.apiUrl}${environment.endpoint.dashboard.listado}`).pipe(
        map((respuesta: any) => respuesta.data)
      );
    }

    obtenerDashboard(){
      this.getDashboard().pipe(take(1)).subscribe(dashboard=>this.dashboardSubject.next(dashboard))
    }




}

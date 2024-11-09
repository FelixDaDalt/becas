import { shareReplay, Subscription, tap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColegioService } from 'src/servicios/colegio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/core/auth.service';

@Component({
  selector: 'app-detalle-colegio',
  templateUrl: './detalle-colegio.component.html',
  styleUrls: ['./detalle-colegio.component.css']
})
export class DetalleColegioComponent implements OnInit, OnDestroy {

  detalle$ = this.colegioService.colegioDetalle$
  private queryParamsSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private colegioService: ColegioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Guardamos la suscripción para desuscribirla después
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      const idColegio = params['id'];

      // Si el usuario tiene rol 0 (admin) y no tiene idColegio, lo redirigimos
      if (this.authService.getUserRole() === 0 && !idColegio) {
        this.router.navigate(['./']); // Ruta a la que deseas redirigirlo
        return; // Salimos para no ejecutar más código
      }

      // Si el usuario tiene rol 0 (admin) y tiene un idColegio, obtenemos los detalles
      if (this.authService.userHasRole([0]) && idColegio) {
        this.colegioService.obtenerDetalle(idColegio);
      }
      // Si el usuario no tiene rol 0 (es un usuario común), obtenemos los detalles sin idColegio
      else {
        this.colegioService.obtenerDetalle();
      }
    });
  }

  // Limpiar la suscripción cuando el componente sea destruido
  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}

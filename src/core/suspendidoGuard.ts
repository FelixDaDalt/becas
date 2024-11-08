import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SuspendidoGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Verificar si el usuario está autenticado
    if (this.authService.isAuthenticated()) {
      const user = this.authService.getUser();
      // Redirigir según el estado de suspendido del colegio
      if (user.id_colegio_colegio.suspendido == 1 || user.suspendido == 1) {
        // Redirigir al componente de suspensión
        this.router.navigate(['/suspendido']); // Asegúrate de que la ruta sea correcta
        return false; // Evitar la activación de la ruta original
      }
      return true;
    }

    return false;
  }
}



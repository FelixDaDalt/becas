import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: number[] = route.data['roles'];

    // Verificar si el usuario está autenticado
    if (!this.authService.isAuthenticated()) {
      const userRole = this.authService.getUserRole();

      // Redirigir según el rol
      if (userRole === 0) {
        this.router.navigate(['/admin/login']);
      } else {
        this.router.navigate(['/login']);
      }
      return false;
    }

    // Obtener el rol del usuario logueado
    const userRole = this.authService.getUserRole();
    // Verificar si el rol del usuario está dentro de los roles permitidos
    if (expectedRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }


}



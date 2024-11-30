import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';
import { AuthService } from './auth.service';
import { usuarioService } from 'src/servicios/usuario.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {


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

    return true;

  }

}



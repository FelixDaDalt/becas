import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  constructor(private router: Router, private authService:AuthService) {}


  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole:number = route.data?.['role']; // Obtiene el rol requerido de la configuración de la ruta
    const userRole = this.authService.getUserRole();

    if (userRole === requiredRole) {
      return true; // Permite la carga del módulo si el rol coincide
    } else {
      this.router.navigate(['colegio']);
      return false;
    }
  }


}

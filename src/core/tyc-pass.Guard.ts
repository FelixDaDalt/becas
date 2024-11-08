import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CambioPassComponent } from 'src/standalone/cambio-pass/cambio-pass.component';
import { tycComponent } from 'src/standalone/terminos/terminos.component';


@Injectable({
  providedIn: 'root'
})
export class TycPassGuard implements CanActivateChild {

  constructor(private authService: AuthService, private modalService: NgbModal) {
    this.modalService.dismissAll()
  }

  async canActivateChild(route: ActivatedRouteSnapshot): Promise<boolean> {
    this.modalService.dismissAll(false)
    const user = this.authService.getUser();

    // Verificar si necesita cambiar la contraseña
    if (user.cambiarPass == 1) {
      const cambioPassResult = await this.solicitarCambioPass(user);
      if (!cambioPassResult) {
        this.authService.logout(); // Logout si no acepta cambiar la contraseña
        return false;
      }
    }

    // Verificar si ha aceptado los TyC
    if (user.tyc == 0) {
      const tycResult = await this.solicitarTyc(user);
      if (!tycResult) {
        this.authService.logout(); // Logout si no acepta los TyC
        return false;
      }
    }

    return true; // Permitir el acceso si todo es válido
  }

  private solicitarCambioPass(user:any): Promise<boolean> {
    const cambioPassModal = this.modalService.open(CambioPassComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    cambioPassModal.componentInstance.usuario = user

    return cambioPassModal.result.then(result => {
      if (result) {
        localStorage.setItem('user', JSON.stringify(result)); // Guardar el usuario después de cambiar la contraseña
        return true;
      }
      return false; // No se aceptó el cambio de contraseña
    });
  }

  private solicitarTyc(user:any): Promise<boolean> {
    const tycModal = this.modalService.open(tycComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    tycModal.componentInstance.usuario = user

    return tycModal.result.then(result => {
      if (result) {
        localStorage.setItem('user', JSON.stringify(result)); // Guardar el usuario después de aceptar los TyC
        return true;
      }
      return false; // No se aceptaron los TyC
    });
  }
}



// role.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/core/auth.service';

@Directive({
  selector: '[Roles]',
  standalone: true
})
export class RoleDirective {

  @Input() set Roles(allowedRoles: number[]) {  // Cambié 'appRole' a 'Roles'
    this.viewContainer.clear(); // Limpia el contenedor

    // Aquí evaluamos el rol del usuario contra los roles permitidos
    this.authService.currentUser.subscribe(usuario => {
      if (usuario && allowedRoles.includes(usuario.id_rol)) {
        // Si el rol está permitido, renderiza el template
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}
}

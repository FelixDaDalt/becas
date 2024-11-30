// role.directive.ts
import { Directive, ElementRef, Input, Optional, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/core/auth.service';


@Directive({
  selector: '[Roles]',
  standalone: true
})
export class RoleDirective {
  private allowedRoles: number[] = [];
  private isTemplateMode = true;
  private nativeElement: HTMLElement | null = null;

  // Maneja roles para plantillas
  @Input() set Roles(allowedRoles: number[] | null | undefined) {
    this.allowedRoles = allowedRoles || [];
    this.isTemplateMode = true;
    this.evaluateAccess();
  }

  // Maneja roles para atributos `readonly`
  @Input() set RolesReadonly(element: HTMLElement | null) {
    this.allowedRoles = this.allowedRoles || [];
    this.isTemplateMode = false;
    this.nativeElement = element;
    this.evaluateAccess();
  }

  constructor(
    @Optional() private templateRef: TemplateRef<any>,
    @Optional() private viewContainer: ViewContainerRef,
    private authService: AuthService,
    private renderer: Renderer2
  ) {}

  private evaluateAccess(): void {
    this.authService.currentUser.subscribe(usuario => {
      const hasAccess = usuario && this.allowedRoles.includes(usuario.id_rol);

      if (this.isTemplateMode && this.templateRef && this.viewContainer) {
        // Modo plantilla
        this.viewContainer.clear();
        if (hasAccess) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      } else if (this.nativeElement) {
        // Modo elemento
        if (hasAccess) {
          this.renderer.removeAttribute(this.nativeElement, 'readonly');
        } else {
          this.renderer.setAttribute(this.nativeElement, 'readonly', 'true');
        }
      }
    });
  }
}

// role.directive.ts
import { Directive, ElementRef, EventEmitter, Input, Optional, Output, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from 'src/core/auth.service';


@Directive({
  selector: '[Roles]',
  standalone: true,
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

  @Output() accessGranted = new BehaviorSubject<boolean>(false);  // Evento para emitir el acceso
  @Output() currentRole = new BehaviorSubject<number | null>(null);

  constructor(
    @Optional() private templateRef: TemplateRef<any>,
    @Optional() private viewContainer: ViewContainerRef,
    private authService: AuthService,
    private renderer: Renderer2
  ) {}

  private evaluateAccess(): void {
    this.authService.currentUser.subscribe(usuario => {
      const hasAccess = usuario && this.allowedRoles.includes(usuario.id_rol);

      if (usuario) {
          this.currentRole.next(usuario.id_rol);  // 🚀 Emitimos el rol actual
      }

      if(hasAccess)
        this.accessGranted.next(hasAccess);

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

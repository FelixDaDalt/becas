// role.directive.ts
import { Directive, ElementRef, EventEmitter, Input, Optional, Output, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from 'src/core/auth.service';


@Directive({
  selector: '[superAdmin]',
  standalone: true,
})
export class SuperAdminDirective {

  private isTemplateMode = true;
  private nativeElement: HTMLElement | null = null;


  @Output() accessGranted = new BehaviorSubject<boolean>(false);  // Evento para emitir el acceso
  @Output() currentRole = new BehaviorSubject<number | null>(null);

  constructor(
    @Optional() private templateRef: TemplateRef<any>,
    @Optional() private viewContainer: ViewContainerRef,
    private authService: AuthService,
    private renderer: Renderer2
  ) {
    this.evaluateAccess()
  }

  private evaluateAccess(): void {
    this.authService.currentUser.subscribe(usuario => {
      const hasAccess = usuario && usuario.superAdmin && usuario.superAdmin == 1

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


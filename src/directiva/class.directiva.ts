import { Directive, Input, ElementRef, Renderer2, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from 'src/core/auth.service';



@Directive({
  selector: '[Class]', // El selector que usarás en el HTML,
  standalone: true
})
export class RolClassDirective implements OnInit, OnDestroy {

  @Input() Class: { roles: number[], classes: string } | undefined;  // Aceptar una cadena de clases
  private destroy$ = new Subject<void>();  // Subject para emitir cuando destruir

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.Class) {
      const { roles, classes } = this.Class;

      this.authService.currentUser
        .pipe(takeUntil(this.destroy$))
        .subscribe(usuario => {
          if (usuario && roles.includes(usuario.id_rol)) {
            // Si el rol está permitido, agrega las clases como una cadena
            this.addClasses(classes);
          } else {
            // Si no está permitido, elimina las clases
            this.removeClasses(classes);
          }
        });
    }
  }

  // Método para agregar las clases
  private addClasses(classes: string): void {
    classes.split(' ').forEach(className => {
      this.renderer.addClass(this.el.nativeElement, className);
    });
  }

  // Método para eliminar las clases
  private removeClasses(classes: string): void {
    classes.split(' ').forEach(className => {
      this.renderer.removeClass(this.el.nativeElement, className);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

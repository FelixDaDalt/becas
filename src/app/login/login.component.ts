import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit{
  formulario:FormGroup
  mostrarPassword: boolean = false;
  isAdminLogin:boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private fb:FormBuilder,
    private activeRoute:ActivatedRoute,
    private modalService: NgbModal) {

      this.isAdminLogin = this.activeRoute.snapshot.pathFromRoot.some(path =>
        path.routeConfig?.path?.includes('admin')
      );



    this.formulario = this.fb.group({
      dni:[null,[Validators.required]],
      password:[null,[Validators.required]]
    })
  }

  ngAfterViewInit() {
    // Aplicar clase al body
    this.renderer.addClass(document.body, 'h-100');

    // Aplicar clase al div con id "root"
    const rootDiv = document.getElementById('root');
    if (rootDiv) {
      this.renderer.addClass(rootDiv, 'h-100');
    }
  }

  ngOnDestroy() {
    // Eliminar clases si es necesario
    this.renderer.removeClass(document.body, 'h-100');

    const rootDiv = document.getElementById('root');
    if (rootDiv) {
      this.renderer.removeClass(rootDiv, 'h-100');
    }
  }

  async ngOnInit(): Promise<void> {
    if(await this.authService.isAuthenticated()){
        this.router.navigate(['dashboard'])
    }
  }

  login(): void {
    if(this.formulario.valid){
      this.authService.login(this.formulario.value,this.isAdminLogin).subscribe({
        next: (user) => {
          this.router.navigate(['dashboard'])
        }
      });
    }else{
      this.formulario.markAllAsTouched()
    }
  }

  cambiarVisibilidad(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }


}

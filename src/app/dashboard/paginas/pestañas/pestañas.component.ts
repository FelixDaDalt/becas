import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/core/auth.service';

@Component({
  selector: 'app-pestañas-menu',
  templateUrl: './pestañas.component.html',
  styleUrls: ['./pestañas.component.css']
})
export class PestañasComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {


  }
  ngOnInit(): void {
    this.activeRoute.url.subscribe(() => {
      const rol = this.authService.getUserRole();
      const ruta = this.router.url;

      if (rol === 0 && !ruta.includes('dashboard/')) {
        this.router.navigate(['tablon'], { relativeTo: this.activeRoute });
      } else if (!ruta.includes('dashboard/')) {
        this.router.navigate(['redes'], { relativeTo: this.activeRoute });
      }
    });
  }

}

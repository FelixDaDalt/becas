import { Component} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/core/auth.service';


@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent{

  constructor(
    private authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd) // Solo actúa en NavigationEnd
      )
      .subscribe(() => {
        const rol = this.authService.getUserRole();
        const ruta = this.router.url;

        // Redirige según el rol y la URL actual
        if (rol == 0 && !ruta.includes('dashboard/')) {
          this.router.navigate(['colegios'], { relativeTo: this.activeRoute });
        } else if (!ruta.includes('dashboard/')) {
          this.router.navigate(['colegio'], { relativeTo: this.activeRoute });
        }
      });
  }


}

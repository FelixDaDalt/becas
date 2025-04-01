import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/core/auth.service';
import { RedService } from 'src/servicios/red.service';

@Component({
  selector: 'app-pestañas-menu',
  templateUrl: './pestañas.component.html',
  styleUrls: ['./pestañas.component.css']
})
export class PestañasRedComponent implements OnInit{
  private queryParamsSubscription: Subscription | undefined;
  idRed?:number
  constructor(private router: Router, private redService:RedService,private route:ActivatedRoute,) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.idRed = params['idRed'];
  })
}

  navegarA(ruta: string): void {
    if(this.idRed)
      this.redService.obtenerMeRed(this.idRed)
      this.router.navigate([ruta], {relativeTo:this.route, queryParamsHandling: 'merge' });
    }

   isActive(ruta: string): boolean {
    return this.router.url.includes(ruta);
  }
}

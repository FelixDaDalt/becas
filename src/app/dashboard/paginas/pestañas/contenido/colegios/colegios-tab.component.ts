import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColegioService } from 'src/servicios/colegio.service';

@Component({
  selector: 'app-colegios-tab',
  templateUrl: './colegios-tab.component.html',
  styleUrls: ['./colegios-tab.component.css']
})
export class ColegiosTabComponent{

  colegioCache = false
  colegios$ = this.colegioService.colegios$

  constructor(private colegioService:ColegioService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    if(!this.colegioCache){
      this.colegioService.obtenerColegios()
      this.colegioCache = true
    }
  }

  suspenderColegio(idColegio:number){
    this.colegioService.suspenderColegio(idColegio)
  }

  agregarResponsable(idColegio:number){
    this.router.navigate(['../alta-responsable'], { queryParams: { idColegio: idColegio } });
  }

  detalleColegio(idColegio:number){
    this.router.navigate(['../colegio'], { queryParams: { id: idColegio }, relativeTo: this.route });
  }

  alta(){
    this.router.navigate(['../alta-colegio'], {relativeTo: this.route })
  }

}

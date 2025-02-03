import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, of, take, tap, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Red } from 'src/interfaces/red';
import { RedService } from 'src/servicios/red.service';

@Component({
  selector: 'app-miembros',
  templateUrl: './miembros.component.html',
  styleUrls: ['./miembros.component.css']
})
export class MiembrosComponent implements OnInit, OnDestroy{

  apiFile=environment.fileUrl
    private queryParamsSubscription: Subscription | undefined;
    idRed = null
    miembros$=this.redService.miembros$.pipe(shareReplay(1))

    constructor(private redService:RedService,
      private route:ActivatedRoute,
      private router:Router){

    }
    ngOnInit(): void {

    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.idRed = params['idRed'];
      if(this.idRed){
        this.redService.obtenerMiembros(this.idRed)
      }else{
        this.router.navigate(['./']);
      }


    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

}

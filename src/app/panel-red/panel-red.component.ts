import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Red } from 'src/interfaces/red';
import { RedService } from 'src/servicios/red.service';

@Component({
  selector: 'app-panel-red',
  templateUrl: './panel-red.component.html',
  styleUrls: ['./panel-red.component.css']
})
export class PanelRedComponent implements OnInit, OnDestroy{

  private queryParamsSubscription: Subscription | undefined;
  idRed = null
  red$:Observable<Red | null>=of(null)
  apiFile=environment.fileUrl
  constructor(private redService:RedService,
    private route:ActivatedRoute,
    private router:Router){

  }
  ngOnInit(): void {

  this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
    this.idRed = params['idRed'];

    if(this.idRed){
      this.red$ = this.redService.obtenerRed(this.idRed).pipe(take(1))
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

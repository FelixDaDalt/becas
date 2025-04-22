import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Red } from 'src/interfaces/red';
import { RedService } from 'src/servicios/red.service';
import { RoleDirective } from 'src/directiva/role.directiva';

@Component({
  selector: 'app-panel-red',
  templateUrl: './panel-red.component.html',
  styleUrls: ['./panel-red.component.css']
})
export class PanelRedComponent implements OnInit, OnDestroy{

  @ViewChild(RoleDirective) roleDirective!: RoleDirective;
  private queryParamsSubscription: Subscription | undefined;
  idRed = null
  red$:Observable<Red | null>=of(null)
  apiFile=environment.fileUrl
  rolActual: number = 0;
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

  setTimeout(() =>
    this.roleDirective.currentRole.pipe(take(1)).subscribe(
      (rol) => {
        if(rol)
        this.rolActual = rol
      }
    ));
  }

ngOnDestroy(): void {
  if (this.queryParamsSubscription) {
    this.queryParamsSubscription.unsubscribe();
  }
}


}

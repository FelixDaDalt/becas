import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { shareReplay, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BecaService } from 'src/servicios/beca.service';
import { NotificacionService } from 'src/servicios/notificacion.service';
import { RedService } from 'src/servicios/red.service';

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css']
})
export class VerSolicitudComponent implements OnInit{

    private queryParamsSubscription: Subscription | undefined;
    detalle$ = this.becaService.miSolicitudDetalle$.pipe(shareReplay(1))
    idSolicitud?:number
    idRed?:number
    resolucion=false
    apiFile=environment.fileUrl
    constructor(private becaService:BecaService,
       private route:ActivatedRoute,
       private router:Router){

    }

    ngOnInit(): void {

    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.idSolicitud = params['idSolicitud'];
      this.idRed = params['idRed']
      if(this.idSolicitud && this.idRed){
        this.becaService.obtenerMiSolicitudDetalle(this.idRed,this.idSolicitud)

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

    desestimar(){
      this.resolucion = !this.resolucion
    }

    resolver(){
      this.resolucion = !this.resolucion
    }

}

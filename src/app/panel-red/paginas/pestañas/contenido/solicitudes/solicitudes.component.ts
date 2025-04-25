import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { shareReplay, Subscription, tap } from 'rxjs';
import { BecaService } from 'src/servicios/beca.service';
import { RedService } from 'src/servicios/red.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnDestroy, OnInit {
  private queryParamsSubscription: Subscription | undefined;
  estados=[{
    id:-1,
    nombre:'Todas'
  },{
    id:0,
    nombre:'Pendientes'
  },{
    id:1,
    nombre:'Desestimadas'
  },{
    id:2,
    nombre:'Rechazadas'
  },{
    id:3,
    nombre:'Pendientes de Baja'
  },{
    id:4,
    nombre:'Vencidas'
  },{
    id:5,
    nombre:'Aprobadas'
  },{
    id:6,
    nombre:'Dadas de baja'
  }]
  active:number=-1

  miRed$ = this.redService.meRed$.pipe(shareReplay(1)).subscribe(
    red=>{
      if(red){
        this.idRed = red.misDatos.id_red
        this.idColegio = red.misDatos.id_colegio
      }
    }
  )

  listado$ = this.becaService.solicitudes$.pipe(shareReplay(1))

  idRed?:number
  idColegio?:number

  constructor(
    private redService:RedService,
    private becaService:BecaService,
    private route:Router,
    private activeRoute:ActivatedRoute){
  }

  ngOnInit(): void {
    this.queryParamsSubscription = this.activeRoute.queryParams.subscribe(params => {
      this.idRed = params['idRed'];
      if(this.idRed)
        this.becaService.obtenerSolicitudes(this.idRed,-1)
  })
}



  ngOnDestroy(): void {
    if(this.miRed$)
      this.miRed$.unsubscribe()
  }

  filtrar(filtro:number){
    if(this.idRed){
      this.becaService.obtenerSolicitudes(this.idRed,filtro)
      this.active = filtro
    }
  }

  verSolicitud(event:any){
    if (event.type === 'click') {
      this.route.navigate(['ver-solicitud'], {
        relativeTo: this.activeRoute,
        queryParams: { idSolicitud: event.row.id }, // Agregar nuevo parámetro
        queryParamsHandling: 'merge' // Combinar con los parámetros existentes
      });
    }
  }

  filter: any;
busqueda: string = '';
updateFilter() {
  this.filter = {
    $or: [
      {
        solicitante: {
          $or: [
            { colegio: this.busqueda },
            { usuario: this.busqueda },
            { alumno: this.busqueda }
          ]
        }
      },
      { colegioSolicitado: this.busqueda }
    ]
  };
}

}

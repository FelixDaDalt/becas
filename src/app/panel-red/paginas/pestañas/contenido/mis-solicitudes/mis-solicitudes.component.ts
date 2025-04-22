import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { BecaService } from 'src/servicios/beca.service';
import { RedService } from 'src/servicios/red.service';

@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './mis-solicitudes.component.html',
  styleUrls: ['./mis-solicitudes.component.css']
})
export class MisSolicitudesComponent {
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
  },
  {
    id:6,
    nombre:'Dada de Bajas'
  }]

  active:number=-1

  miRed$ = this.redService.meRed$.pipe(shareReplay(1)).subscribe(
    red=>{
      if(red){
        this.idRed = red.misDatos.id_red
        this.idColegio = red.misDatos.id_colegio
        if(this.idRed)
          this.becaService.obtenerMisSolicitudes(this.idRed,-1)
      }
    }
  )

  listado$ = this.becaService.misSolicitudes$.pipe(shareReplay(1))

  idRed?:number
  idColegio?:number

  constructor(
    private redService:RedService,
    private becaService:BecaService,
    private route:Router,
    private activeRoute:ActivatedRoute){
  }

  ngOnDestroy(): void {
    if(this.miRed$)
      this.miRed$.unsubscribe()
  }

  filtrar(filtro:number){
    if(this.idRed){
      this.becaService.obtenerMisSolicitudes(this.idRed,filtro)
      this.active = filtro
    }
  }

  verSolicitud(solicitud:any){
    this.route.navigate(['ver-solicitud'], {
      relativeTo: this.activeRoute,
      queryParams: { idSolicitud: solicitud.id }, // Agregar nuevo parámetro
      queryParamsHandling: 'merge' // Combinar con los parámetros existentes
    });
  }

filter: any;
busqueda: string = '';
updateFilter() {
  this.filter = {
    $or: [
      { solicitante: {
        $or: [{ usuario: this.busqueda }]
      }
    },
    { solicitud: {
        $or: [
          { colegio: this.busqueda },
          { alumno: this.busqueda }
        ]
      }
    }
    ]
  }
}
}

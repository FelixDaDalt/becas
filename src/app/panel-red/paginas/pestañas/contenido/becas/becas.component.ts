import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AltaBecaComponent } from './alta-beca/alta-beca.component';
import { shareReplay, Subscription, take, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RedService } from 'src/servicios/red.service';
import { BecaService } from 'src/servicios/beca.service';
import { SolicitudBecaComponent } from './solicitud-beca/solicitud-beca.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-becas',
  templateUrl: './becas.component.html',
  styleUrls: ['./becas.component.css']
})
export class BecasComponent implements OnInit, OnDestroy{

  miRed$ = this.redService.meRed$.pipe(shareReplay(1)).subscribe(
    red=>{
      if(red){
        this.idRed = red.misDatos.id_red
        this.cantidadPublicadas = red.misDatos.bp
        this.derechoDisponible = red.misDatos.dbd
        this.idColegio = red.misDatos.id_colegio
      }

    }
  )
  private queryParamsSubscription: Subscription | undefined;

  listado$ = this.becaService.becas$.pipe(shareReplay(1))
  apiFile=environment.fileUrl
  idRed?:number
  idColegio?:number
  cantidadPublicadas?:number

  derechoDisponible?:number

  constructor(private modalService:NgbModal,
  private redService:RedService,
  private becaService:BecaService,
  private route:ActivatedRoute){

  }

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.idRed = params['idRed'];
      if(this.idRed)
        this.becaService.obtenerBecas(this.idRed)
  })
}

  ngOnDestroy(): void {
    if(this.miRed$)
      this.miRed$.unsubscribe()
  }

  alta(){
    if(this.idRed){
      const modalAltaBeca = this.modalService.open(AltaBecaComponent)
      modalAltaBeca.componentInstance.idRed = this.idRed
      modalAltaBeca.componentInstance.cantidad = this.cantidadPublicadas
      modalAltaBeca.result.then(r=>{
        if(r && this.idRed)
          this.redService.obtenerMeRed(this.idRed)
      })
    }

  }

  solicitar(beca:any){
    if(this.idRed && beca.id){
      const disponible = beca.disponible || 0
      const derecho = this.derechoDisponible || 0
      const total = Math.min(disponible, derecho);

      const modalSolicitarBeca = this.modalService.open(SolicitudBecaComponent,{size:'lg'})
      modalSolicitarBeca.componentInstance.idRed = this.idRed
      modalSolicitarBeca.componentInstance.idBeca = beca.id
      modalSolicitarBeca.componentInstance.maximo = total
      modalSolicitarBeca.result.then(r=>{
        if(r && this.idRed)
          this.redService.obtenerMeRed(this.idRed)
      })
    }
  }

filter: any;
busqueda: string = '';
updateFilter() {
  this.filter = {
    $or: [
      { usuario: {
        $or: [{ nombre: this.busqueda }, { apellido: this.busqueda }, { id: this.busqueda }]
      }
    },
    { colegio: {
        $or: [
          { nombre: this.busqueda },
          { cuit: this.busqueda },
          { id: this.busqueda },
          { localidad: this.busqueda },
          { provincia: this.busqueda }
        ]
      }
    }
    ]
  };
}
}

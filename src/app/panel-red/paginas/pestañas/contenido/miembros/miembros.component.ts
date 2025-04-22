import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, Observable, of, take, tap, shareReplay } from 'rxjs';
import { EditarMiembrosComponent } from 'src/app/dashboard/paginas/pestañas/contenido/redes/editar-miembros/editar-miembros.component';
import { VerColegioComponent } from 'src/app/ver-colegio/ver-colegio.component';
import { environment } from 'src/environments/environment';
import { Red } from 'src/interfaces/red';
import { RedService } from 'src/servicios/red.service';
import { TareasService } from 'src/servicios/tareas.service';

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
    meRed$ = this.redService.meRed$.pipe(shareReplay(1))

    constructor(private redService:RedService,
      private route:ActivatedRoute,
      private router:Router,
      private tareasService:TareasService,
      private modalService:NgbModal){

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

  filter: any;
  busqueda: string = '';
  updateFilter(): void {
    this.filter = {
      $or: [
        {
          id_colegio_colegio: {
            $or: [
              { cuit: this.busqueda },
              { nombre: this.busqueda },
              { direccion_calle: this.busqueda },
              { direccion_numero: this.busqueda },
              { localidad: this.busqueda },
              { provincia: this.busqueda },
              { cp: this.busqueda },
              { telefono: this.busqueda },
              { url: this.busqueda },
              { email: this.busqueda }
            ]
          }
        }
      ]
    };
  }

  agregarMiembro(){
    if(this.idRed)
          this.redService.obtenerRed(this.idRed).pipe(take(1)).subscribe(red=>{
            const modal = this.modalService.open(EditarMiembrosComponent, {backdrop:'static', size:'lg'})
            modal.componentInstance.red = red
        })
  }

  verColegio(idColegio:number){
    const modalColegio = this.modalService.open(VerColegioComponent, { size: 'lg', backdrop: 'static' })
    modalColegio.componentInstance.idColegio = idColegio
    modalColegio.componentInstance.modal = true;
  }

}

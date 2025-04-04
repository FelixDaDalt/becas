import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Red } from 'src/interfaces/red';
import { RedService } from 'src/servicios/red.service';
import { ConfirmarComponent } from 'src/standalone/confirmar/confirmar.component';
import { AltaRedComponent } from '../../../alta/alta-red/alta-red.component';
import { EditarRedComponent } from './editar-red/editar-red.component';
import { EditarMiembrosComponent } from './editar-miembros/editar-miembros.component';

@Component({
  selector: 'app-redes-tab',
  templateUrl: './redes-tab.component.html',
  styleUrls: ['./redes-tab.component.css']
})
export class RedesTabComponent{

  redCache = false
  redes$ = this.redService.redes$.pipe(shareReplay(1),tap(r=>console.log(r)))
  apiUrl = environment.fileUrl
  constructor(private redService:RedService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private modalService:NgbModal){}

  ngOnInit(): void {
    if(!this.redCache){
      this.redService.obtenerRedes()
      this.redCache = true
    }
  }

  editar(red:Red){
    const editarRed=this.modalService.open(EditarRedComponent, {backdrop:'static', size:'lg'})
    editarRed.componentInstance.red = red
  }

  editarMiembros(red:Red){
    const editarRed=this.modalService.open(EditarMiembrosComponent, {backdrop:'static', size:'lg'})
    editarRed.componentInstance.red = red
  }

  alta(){
    this.router.navigate(['../alta-red'], {relativeTo: this.activeRoute })
  }

  confirmarEliminar(red:Red){
    const modalEliminar = this.modalService.open(ConfirmarComponent,{backdrop:'static'})
    modalEliminar.componentInstance.itemAEliminar = 'Red:'+ red.nombre + ', Anfitrion: '+ red.Anfitrion?.nombre
    modalEliminar.result.then(r=>{
      if(r)
        this.eliminarRed(red.id)
    })
  }

  private eliminarRed(idRed:number){
    this.redService.eliminar(idRed)
  }

  verRed(idRed:number){
    this.router.navigate(['../panel-red'], { queryParams: { idRed: idRed }, relativeTo:this.activeRoute})
  }

  filter: any;
  busqueda: string = '';
  updateFilter() {
    this.filter = {
      $or: [
        { nombre: this.busqueda },
        { porcentaje: this.busqueda },
        { caracteristicas: this.busqueda },
        {
          Anfitrion: {
            $or: [
              { nombre: this.busqueda },
              { cuit: this.busqueda }
            ]
          }
        }
      ]
    };
  }

}

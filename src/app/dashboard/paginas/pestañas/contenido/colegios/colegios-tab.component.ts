import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Colegio } from 'src/interfaces/colegio';
import { ColegioService } from 'src/servicios/colegio.service';
import { ConfirmarComponent } from 'src/standalone/confirmar/confirmar.component';
import { EditarColegioComponent } from './editar-colegio/editar-colegio.component';


@Component({
  selector: 'app-colegios-tab',
  templateUrl: './colegios-tab.component.html',
  styleUrls: ['./colegios-tab.component.css']
})
export class ColegiosTabComponent{

  colegioCache = false
  colegios$ = this.colegioService.colegios$

  constructor(private colegioService:ColegioService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private modalService:NgbModal){}

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
    this.router.navigate(['../alta-responsable'], { queryParams: { idColegio: idColegio }, relativeTo: this.activeRoute });
  }

  detalleColegio(idColegio:number){
    this.router.navigate(['../colegio'], { queryParams: { id: idColegio }, relativeTo: this.activeRoute });
  }

  alta(){
    this.router.navigate(['../alta-colegio'], {relativeTo: this.activeRoute })
  }

  confirmarEliminar(colegio:Colegio){
    const modalEliminar = this.modalService.open(ConfirmarComponent,{backdrop:'static'})
    modalEliminar.componentInstance.itemAEliminar = `${colegio.nombre}, Cuit: ${colegio.cuit} y todos sus Usuarios`
    modalEliminar.result.then(r=>{
      if(r)
        this.eliminarColegio(colegio.id)
    })
  }

  private eliminarColegio(idColegio:number){
    this.colegioService.eliminarColegio(idColegio)
  }

  editarColegio(colegio:Colegio){
    const editarModal = this.modalService.open(EditarColegioComponent,{backdrop:'static', size:'lg'})
    editarModal.componentInstance.colegio = colegio
  }

}

import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Autorizado } from 'src/interfaces/autorizado';
import { AutorizadoService } from 'src/servicios/autorizado.service';
import { ConfirmarComponent } from 'src/standalone/confirmar/confirmar.component';
import { EditarAutorizadoComponent } from 'src/standalone/editar-autorizado/editar-autorizado.component';



@Component({
  selector: 'app-autorizados-tab',
  templateUrl: './autorizados-tab.component.html',
  styleUrls: ['./autorizados-tab.component.css']
})
export class AutorizadosTabComponent{

  cacheautorizados = false;
  autorizados$=this.autorizadoService.autorizados$.pipe(shareReplay(1))

  constructor(
    private autorizadoService:AutorizadoService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private modalService:NgbModal){}

  ngOnInit(): void {
    if(!this.cacheautorizados){
      this.autorizadoService.obtenerAutorizados()
      this.cacheautorizados = true
    }
  }

  suspenderAutorizado(idAutorizado:number){
    this.autorizadoService.suspenderAutorizado(idAutorizado).subscribe(respuesta=>
      this.autorizadoService.obtenerAutorizados()
    )
  }

  alta(){
    this.router.navigate(['../alta-autorizado'], {relativeTo: this.activeRoute })
  }


  confirmarEliminar(autorizado:Autorizado){
    const modalEliminar = this.modalService.open(ConfirmarComponent,{backdrop:'static'})
    modalEliminar.componentInstance.itemAEliminar = autorizado.apellido + ', '+ autorizado.nombre
    modalEliminar.result.then(r=>{
      if(r)
        this.eliminarAutorizado(autorizado.id)
    })
  }

  private eliminarAutorizado(idAutorizado:number){
    this.autorizadoService.eliminarAutorizado(idAutorizado).subscribe(respuesta=>{
      this.autorizadoService.obtenerAutorizados()
    })
  }

  editarAutorizado(Autorizado:Autorizado){
    const modalEditar = this.modalService.open(EditarAutorizadoComponent,{backdrop:'static'})
    modalEditar.componentInstance.idAutorizado = Autorizado.id
    modalEditar.result.then(r=>{
      if(r)
        this.autorizadoService.obtenerAutorizados()
    })
  }

  filter: any;
  busqueda: string = '';
  updateFilter() {
    this.filter = {
      $or: [
        { dni: this.busqueda },
        { nombre: this.busqueda },
        { apellido: this.busqueda },
        { telefono: this.busqueda },
        { celular: this.busqueda }
      ]
    };
  }

}

import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Red } from 'src/interfaces/red';
import { RedService } from 'src/servicios/red.service';
import { ConfirmarComponent } from 'src/standalone/confirmar/confirmar.component';

@Component({
  selector: 'app-redes-tab',
  templateUrl: './redes-tab.component.html',
  styleUrls: ['./redes-tab.component.css']
})
export class RedesTabComponent{

  redCache = false
  redes$ = this.redService.redes$.pipe(tap(r=>console.log(r)))
  apiUrl = environment.apiUrl
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



  alta(){
    this.router.navigate(['../alta-red'], {relativeTo: this.activeRoute })
  }

  confirmarEliminar(red:Red){
    const modalEliminar = this.modalService.open(ConfirmarComponent,{backdrop:'static'})
    modalEliminar.componentInstance.itemAEliminar = 'Red:'+ red.nombre + ', Anfitrion: '+ red.Anfitrion.nombre
    modalEliminar.result.then(r=>{
      if(r)
        this.eliminarRed(red.id)
    })
  }

  private eliminarRed(idRed:number){
    this.redService.eliminar(idRed)
  }

}

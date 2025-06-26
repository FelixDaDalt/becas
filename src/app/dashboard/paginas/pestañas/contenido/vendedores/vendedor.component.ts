import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { shareReplay, tap } from 'rxjs';
import { Vendedor } from 'src/interfaces/vendedor';
import { vendedorService } from 'src/servicios/vendedor.service';
import { ConfirmarComponent } from 'src/standalone/confirmar/confirmar.component';
import { EditarAutorizadoComponent } from 'src/standalone/editar-autorizado/editar-autorizado.component';
import { EditarVendedorComponent } from 'src/standalone/editar-vendedor/editar-vendedor.component';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.css']
})
export class vendedorComponent {

    cachevendedores = false;
   vendedores$=this.vendedoresService.vendedores$.pipe(shareReplay(1))

   constructor(
     private vendedoresService:vendedorService,
     private activeRoute: ActivatedRoute,
     private router: Router,
     private modalService:NgbModal){}

   ngOnInit(): void {
     if(!this.cachevendedores){
       this.vendedoresService.obtenerVendedores()
       this.cachevendedores = true
     }
   }

   suspenderVendedor(idvendedor:number){
    this.vendedoresService.suspenderVendedor(idvendedor).subscribe(respuesta=>
      this.vendedoresService.obtenerVendedores()
    )
  }

   alta(){
     this.router.navigate(['../alta-vendedor'], {relativeTo: this.activeRoute })
   }


   confirmarEliminar(vendedor:Vendedor){
     const modalEliminar = this.modalService.open(ConfirmarComponent,{backdrop:'static'})
     modalEliminar.componentInstance.itemAEliminar = vendedor.apellido + ', '+ vendedor.nombre
     modalEliminar.result.then(r=>{
       if(r)
         this.eliminarVendedor(vendedor.id)
     })
   }

   private eliminarVendedor(idVendedor:number){
     this.vendedoresService.eliminarVendedor(idVendedor).subscribe(respuesta=>{
       this.vendedoresService.obtenerVendedores()
     })
   }

   editarVendedor(Vendedor:Vendedor){
     const modalEditar = this.modalService.open(EditarVendedorComponent,{backdrop:'static'})
     modalEditar.componentInstance.idVendedor = Vendedor.id
     modalEditar.result.then(r=>{
       if(r)
         this.vendedoresService.obtenerVendedores()
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

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { shareReplay, tap } from 'rxjs';
import { AuthService } from 'src/core/auth.service';
import { Usuario } from 'src/interfaces/usuario';
import { usuarioService } from 'src/servicios/usuario.service';
import { CambioPassComponent } from 'src/standalone/cambio-pass/cambio-pass.component';
import { EditarMisDatosComponent } from 'src/standalone/editar-mis-datos/editar-mis-datos.component';

@Component({
  selector: 'app-mis-datos-columna',
  templateUrl: './mis-datos-columna.component.html',
  styleUrls: ['./mis-datos-columna.component.css']
})
export class MisDatosColumnaComponent{

    user$ = this.usuarioService.me$.pipe(shareReplay(1))

    constructor(private usuarioService:usuarioService,
      private modalService:NgbModal,
    private authService:AuthService){

    }

    editar(){
      const modalEditar = this.modalService.open(EditarMisDatosComponent)
     }

     cambiarPass(usuario:Usuario){
       const modalPass = this.modalService.open(CambioPassComponent)
       modalPass.componentInstance.usuario = usuario
       modalPass.componentInstance.alerta = false
       modalPass.result.then(r=>{
         if(r)
           this.logout()
       })
      }

      logout() {
        this.authService.logout();
      }

}

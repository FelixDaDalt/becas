import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, shareReplay, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/interfaces/usuario';
import { AdminService } from 'src/servicios/admin.service';
import { usuarioService } from 'src/servicios/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit{
  @Input() idUsuario?:number
  admin?=false
  apiFile=environment.fileUrl
  usuario$?:Observable<Usuario | undefined> = of(undefined)

  constructor(private usuarioService:usuarioService,
    private activeModal:NgbActiveModal,
    private adminService:AdminService
  ){

  }

  ngOnInit(): void {
    if(this.idUsuario)
      !this.admin?
      this.usuario$ = this.usuarioService.obtenerUsuario(this.idUsuario).pipe(take(1),shareReplay(1)):
      this.usuario$ = this.adminService.obtenerAdmin(this.idUsuario).pipe(take(1),shareReplay(1))
  }

  cerrar(){
    this.activeModal.close()
  }
}

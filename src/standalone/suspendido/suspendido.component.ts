import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from 'src/core/auth.service';
import { Usuario } from 'src/interfaces/usuario';

@Component({
  selector: 'app-suspendido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suspendido.component.html',
  styleUrls: ['./suspendido.component.css']
})
export class SuspendidoComponent {
  usuario?:Usuario
  constructor(private authService:AuthService){
      this.usuario = this.authService.getUser()
  }

  logout(){
    this.authService.logout()
  }
}

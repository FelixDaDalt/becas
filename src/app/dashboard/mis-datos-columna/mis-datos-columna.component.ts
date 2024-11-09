import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs';
import { AuthService } from 'src/core/auth.service';
import { Usuario } from 'src/interfaces/usuario';

@Component({
  selector: 'app-mis-datos-columna',
  templateUrl: './mis-datos-columna.component.html',
  styleUrls: ['./mis-datos-columna.component.css']
})
export class MisDatosColumnaComponent{

    user$ = this.authService.currentUser.pipe(shareReplay(1))

    constructor(private authService:AuthService){

    }


}

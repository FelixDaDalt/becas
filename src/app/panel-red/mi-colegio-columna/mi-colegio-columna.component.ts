import { usuarioService } from 'src/servicios/usuario.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { RedService } from 'src/servicios/red.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mi-colegio-columna',
  templateUrl: './mi-colegio-columna.component.html',
  styleUrls: ['./mi-colegio-columna.component.css']
})
export class MiColegioColumnaComponent implements OnInit{

  @Input() idRed:number | null = null
  user$ = this.usuarioService.me$.pipe(shareReplay(1));
  miRed$ = this.redService.meRed$.pipe(shareReplay(1))
  apiFile=environment.fileUrl
  constructor(private usuarioService:usuarioService, private redService:RedService){

  }

  ngOnInit(): void {
    if(this.idRed){
      this.redService.obtenerMeRed(this.idRed)
    }

  }
}

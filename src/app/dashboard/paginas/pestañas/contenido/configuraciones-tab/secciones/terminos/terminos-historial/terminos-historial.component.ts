import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { tap } from 'rxjs';

import { TerminosService } from 'src/servicios/terminos.service';
import { tyc } from 'src/standalone/terminos/tyc';

@Component({
  selector: 'app-terminos-historial',
  templateUrl: './terminos-historial.component.html',
  styleUrls: ['./terminos-historial.component.css']
})
export class TerminosHistorialComponent implements OnInit{

  historialTyc$ = this.terminosService.tycHistorial$.pipe(
    tap(historial=>this.historialTyc.emit(historial[0]))
  )

  @Output() historialTyc = new EventEmitter<tyc>();

  constructor(private terminosService:TerminosService){}

  ngOnInit(): void {
    this.terminosService.obtenerHistorialTyC()
  }

}

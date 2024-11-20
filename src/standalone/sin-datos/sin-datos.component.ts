import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sin-datos',
  standalone: true,
  templateUrl: './sin-datos.component.html',
  styleUrls: ['./sin-datos.component.css']
})
export class SinDatosComponent {
  @Input() mensaje = 'Parece que no hay nada por aquí. ¿Qué tal si comienzas a agregar algunos?'

  constructor(){

  }
}

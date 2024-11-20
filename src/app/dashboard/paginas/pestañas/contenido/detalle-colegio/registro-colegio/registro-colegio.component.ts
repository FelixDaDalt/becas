import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RoleDirective } from 'src/directiva/role.directiva';
import { Registro } from 'src/interfaces/registro';
import { SinDatosComponent } from "../../../../../../../standalone/sin-datos/sin-datos.component";

@Component({
  selector: 'app-registro-colegio',
  templateUrl: './registro-colegio.component.html',
  styleUrls: ['./registro-colegio.component.css'],
  standalone:true,
  imports: [CommonModule, RoleDirective, SinDatosComponent]
})
export class RegistroColegioComponent {

  @Input() registros?:Registro
}

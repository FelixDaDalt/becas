import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleDirective } from 'src/directiva/role.directiva';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { RouterModule } from '@angular/router';
import { MiembrosComponent } from './miembros.component';
import { FormatDniCuitPipe } from "../../../../../../pipes/formatoDniCuit.pipe";



@NgModule({
  declarations: [
    MiembrosComponent
  ],
  imports: [
    CommonModule,
    RoleDirective,
    CommonModule,
    SinDatosComponent,
    RouterModule.forChild([
        { path: '', component: MiembrosComponent }
    ]),
    FormatDniCuitPipe
]
})
export class MiembrosModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDirective } from 'src/directiva/role.directiva';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { RouterModule } from '@angular/router';
import { SolicitudesComponent } from './solicitudes.component';



@NgModule({
  declarations: [
    SolicitudesComponent
  ],
  imports: [
    RoleDirective,
    CommonModule,
    SinDatosComponent,
    RouterModule.forChild([
      { path: '', component: SolicitudesComponent}
    ])
  ]
})
export class SolicitudesModule { }

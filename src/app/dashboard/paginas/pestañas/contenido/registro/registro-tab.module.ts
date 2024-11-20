import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { RoleDirective } from 'src/directiva/role.directiva';
import { RegistroTabComponent } from './registro-tab.component';
import { RegistroColegioComponent } from "../detalle-colegio/registro-colegio/registro-colegio.component";



@NgModule({
  declarations: [RegistroTabComponent],
  imports: [
    RoleDirective,
    CommonModule,
    SinDatosComponent,
    RouterModule.forChild([
        { path: '', component: RegistroTabComponent }
    ]),
    RegistroColegioComponent
]
})
export class RegistroTabModule { }

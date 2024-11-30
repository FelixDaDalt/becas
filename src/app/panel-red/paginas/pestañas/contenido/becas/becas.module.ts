import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDirective } from 'src/directiva/role.directiva';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { RouterModule } from '@angular/router';
import { BecasComponent } from './becas.component';



@NgModule({
  declarations: [
    BecasComponent
  ],
  imports: [
    RoleDirective,
    CommonModule,
    SinDatosComponent,
    RouterModule.forChild([
      { path: '', component: BecasComponent }
    ])
  ]
})
export class BecasModule { }

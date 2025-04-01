import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PestañasComponent } from './pestañas.component';
import { PestañasRoutingModule } from './pestañas-routing.module';
import { RoleDirective } from 'src/directiva/role.directiva';


@NgModule({
  declarations: [
    PestañasComponent
  ],
  imports: [
    CommonModule,
    PestañasRoutingModule,
    RoleDirective,


  ]
})
export class PestañasModule { }

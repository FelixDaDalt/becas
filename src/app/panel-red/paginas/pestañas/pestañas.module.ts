import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PestañasRedRoutingModule } from './pestañas-routing.module';
import { RoleDirective } from 'src/directiva/role.directiva';
import { PestañasRedComponent } from './pestañas.component';




@NgModule({
  declarations: [
    PestañasRedComponent,
  ],
  imports: [
    CommonModule,
    PestañasRedRoutingModule,
    RoleDirective,

  ]
})
export class PestañasRedModule { }

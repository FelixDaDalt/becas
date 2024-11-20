import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { RedesTabComponent } from './redes-tab.component';
import { RoleDirective } from 'src/directiva/role.directiva';



@NgModule({
  declarations: [RedesTabComponent],
  imports: [
    CommonModule,
    SinDatosComponent,
    RoleDirective,
    RouterModule.forChild([
      { path: '', component: RedesTabComponent }
    ])
  ]
})
export class RedesTabModule { }

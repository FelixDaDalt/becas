import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { RoleDirective } from 'src/directiva/role.directiva';
import { AutorizadosTabComponent } from './autorizados-tab.component';



@NgModule({
  declarations: [AutorizadosTabComponent],
  imports: [
    RoleDirective,
    CommonModule,
    SinDatosComponent,
    RouterModule.forChild([
      { path: '', component: AutorizadosTabComponent }
    ])
  ]
})
export class AutorizadosTabModule { }

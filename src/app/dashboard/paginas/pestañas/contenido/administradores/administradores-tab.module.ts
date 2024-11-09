import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdministradoresTabComponent } from './administradores-tab.component';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';



@NgModule({
  declarations: [AdministradoresTabComponent],
  imports: [
    CommonModule,
    SinDatosComponent,
    RouterModule.forChild([
      { path: '', component: AdministradoresTabComponent }
    ])
  ]
})
export class AdministradoresTabModule { }

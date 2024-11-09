import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ColegiosTabComponent } from './colegios-tab.component';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';



@NgModule({
  declarations: [ColegiosTabComponent],
  imports: [
    CommonModule,
    SinDatosComponent,
    RouterModule.forChild([
      { path: '', component: ColegiosTabComponent }
    ])
  ]
})
export class ColegiosTabModule { }

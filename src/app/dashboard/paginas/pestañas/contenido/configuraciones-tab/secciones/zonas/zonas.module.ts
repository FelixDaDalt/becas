import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZonasComponent } from './zonas.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';




@NgModule({
  declarations: [
    ZonasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: '', component: ZonasComponent }
    ]),
    SinDatosComponent
]
})
export class ZonasModule { }

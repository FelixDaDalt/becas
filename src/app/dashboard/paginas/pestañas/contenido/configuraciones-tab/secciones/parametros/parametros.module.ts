import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { ParametrosComponent } from './parametros.component';




@NgModule({
  declarations: [
    ParametrosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: '', component: ParametrosComponent }
    ]),
    SinDatosComponent,
    ReactiveFormsModule,
    FormsModule
]
})
export class ParametrosModule { }

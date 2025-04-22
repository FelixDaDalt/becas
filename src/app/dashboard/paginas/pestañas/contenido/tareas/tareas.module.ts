import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { NgbAccordionModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TareasComponent } from './tareas.component';
import { EjecucionesComponent } from './ejecuciones/ejecuciones.component';




@NgModule({
  declarations: [
    TareasComponent,
    EjecucionesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: '', component: TareasComponent }
    ]),
    SinDatosComponent,
    NgbTooltipModule,
    FormsModule,
    NgbAccordionModule
]
})
export class TareasModule { }

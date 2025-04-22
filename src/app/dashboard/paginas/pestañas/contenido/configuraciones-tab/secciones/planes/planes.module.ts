import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { PlanesComponent } from './planes.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorFormularioComponent } from "../../../../../../../../standalone/error-formulario/error-formulario.component";




@NgModule({
  declarations: [
    PlanesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: '', component: PlanesComponent }
    ]),
    SinDatosComponent,
    NgbTooltipModule,
    ErrorFormularioComponent
]
})
export class PlanesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormasPagoComponent } from './formas_pago.component';
import { ErrorFormularioComponent } from "../../../../../../../../standalone/error-formulario/error-formulario.component";





@NgModule({
  declarations: [
    FormasPagoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: '', component: FormasPagoComponent }
    ]),
    SinDatosComponent,
    NgbTooltipModule,
    ErrorFormularioComponent
]
})
export class FormasPagoModule { }

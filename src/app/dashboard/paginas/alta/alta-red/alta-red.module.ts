import { ErrorFormularioComponent } from 'src/standalone/error-formulario/error-formulario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BotonCargandoComponent } from 'src/standalone/boton-cargando/boton-cargando.component';
import { AltaRedComponent } from './alta-red.component';
import { AltaRedRoutingModule } from './alta-red-routing.module';
import { SinDatosComponent } from "../../../../../standalone/sin-datos/sin-datos.component";



@NgModule({
  declarations: [
    AltaRedComponent
  ],
  imports: [
    CommonModule,
    AltaRedRoutingModule,
    ReactiveFormsModule,
    ErrorFormularioComponent,
    BotonCargandoComponent,
    NgSelectModule,
    SinDatosComponent
]
})
export class AltaRedModule { }

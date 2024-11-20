import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { ErrorFormularioComponent } from 'src/standalone/error-formulario/error-formulario.component';
import { BotonCargandoComponent } from 'src/standalone/boton-cargando/boton-cargando.component';
import { AltaAutorizadoComponent } from './alta-autorizado.component';
import { AltaAutorizadoRoutingModule } from './alta-autorizado-routing.module';



@NgModule({
  declarations: [
    AltaAutorizadoComponent
  ],
  imports: [
    CommonModule,
    AltaAutorizadoRoutingModule,
    ReactiveFormsModule,
    SinDatosComponent,
    ErrorFormularioComponent,
    NgSelectModule,
    BotonCargandoComponent,
    FormsModule
  ]
})
export class AltaAutorizadoModule { }

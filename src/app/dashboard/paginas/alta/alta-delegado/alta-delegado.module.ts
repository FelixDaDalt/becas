import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { ErrorFormularioComponent } from 'src/standalone/error-formulario/error-formulario.component';
import { BotonCargandoComponent } from 'src/standalone/boton-cargando/boton-cargando.component';
import { AltaDelegadoComponent } from './alta-delegado.component';
import { AltaDelegadoRoutingModule } from './alta-delegado-routing.module';



@NgModule({
  declarations: [
    AltaDelegadoComponent
  ],
  imports: [
    CommonModule,
    AltaDelegadoRoutingModule,
    ReactiveFormsModule,
    SinDatosComponent,
    ErrorFormularioComponent,
    NgSelectModule,
    BotonCargandoComponent,
    FormsModule
  ]
})
export class AltaDelegadoModule { }

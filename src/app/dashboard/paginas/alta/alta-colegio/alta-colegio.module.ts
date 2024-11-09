import { ErrorFormularioComponent } from 'src/standalone/error-formulario/error-formulario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaColegioComponent } from './alta-colegio.component';
import { AltaColegioRoutingModule } from './alta-colegio-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { BotonCargandoComponent } from 'src/standalone/boton-cargando/boton-cargando.component';



@NgModule({
  declarations: [
    AltaColegioComponent
  ],
  imports: [
    CommonModule,
    AltaColegioRoutingModule,
    ReactiveFormsModule,
    ErrorFormularioComponent,
    BotonCargandoComponent,
    NgSelectModule
  ]
})
export class AltaColegioModule { }

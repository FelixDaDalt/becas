import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { ErrorFormularioComponent } from 'src/standalone/error-formulario/error-formulario.component';
import { BotonCargandoComponent } from 'src/standalone/boton-cargando/boton-cargando.component';
import { AltaVendedorRoutingModule } from './alta-vendedor-routing.module';
import { AltaVendedorComponent } from './alta-vendedor.component';




@NgModule({
  declarations: [
    AltaVendedorComponent
  ],
  imports: [
    CommonModule,
    AltaVendedorRoutingModule,
    ReactiveFormsModule,
    SinDatosComponent,
    ErrorFormularioComponent,
    NgSelectModule,
    BotonCargandoComponent,
    FormsModule
  ]
})
export class AltaVendedorModule { }

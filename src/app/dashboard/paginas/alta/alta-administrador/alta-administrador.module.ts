import { ErrorFormularioComponent } from 'src/standalone/error-formulario/error-formulario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaAdministradorComponent } from './alta-administrador.component';
import { AltaAdministradorRoutingModule } from './alta-administrador-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BotonCargandoComponent } from 'src/standalone/boton-cargando/boton-cargando.component';

@NgModule({
  declarations: [
    AltaAdministradorComponent
  ],
  imports: [
    CommonModule,
    AltaAdministradorRoutingModule,
    ReactiveFormsModule,
    ErrorFormularioComponent,
    BotonCargandoComponent,
  ]
})
export class AltaAdministradorModule { }

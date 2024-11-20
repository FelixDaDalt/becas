import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaResponsableRoutingModule } from './alta-responsable-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AltaResponsableComponent } from './alta-responsable.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { ErrorFormularioComponent } from 'src/standalone/error-formulario/error-formulario.component';
import { BotonCargandoComponent } from 'src/standalone/boton-cargando/boton-cargando.component';



@NgModule({
  declarations: [
    AltaResponsableComponent
  ],
  imports: [
    CommonModule,
    AltaResponsableRoutingModule,
    ReactiveFormsModule,
    SinDatosComponent,
    ErrorFormularioComponent,
    NgSelectModule,
    BotonCargandoComponent,
    FormsModule
  ]
})
export class AltaResponsableModule { }

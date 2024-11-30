import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ColegiosTabComponent } from './colegios-tab.component';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { BotonCargandoComponent } from "../../../../../../standalone/boton-cargando/boton-cargando.component";
import { ErrorFormularioComponent } from "../../../../../../standalone/error-formulario/error-formulario.component";
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditarColegioComponent } from './editar-colegio/editar-colegio.component';



@NgModule({
  declarations: [ColegiosTabComponent,EditarColegioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SinDatosComponent,
    RouterModule.forChild([
        { path: '', component: ColegiosTabComponent }
    ]),
    BotonCargandoComponent,
    ErrorFormularioComponent,
    NgSelectModule
]
})
export class ColegiosTabModule { }

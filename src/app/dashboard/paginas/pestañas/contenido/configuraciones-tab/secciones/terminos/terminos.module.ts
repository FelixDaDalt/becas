import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TerminosHistorialComponent } from './terminos-historial/terminos-historial.component';
import { TerminosComponent } from './terminos.component';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { NgxEditorModule } from 'ngx-editor';
import { BotonCargandoComponent } from 'src/standalone/boton-cargando/boton-cargando.component';




@NgModule({
  declarations: [TerminosComponent, TerminosHistorialComponent],
  imports: [
    CommonModule,
    SinDatosComponent,
    ReactiveFormsModule,
    NgxEditorModule,
    BotonCargandoComponent,
    RouterModule.forChild([
      { path: '', component: TerminosComponent }
    ])
  ]
})
export class TerminosTabModule { }

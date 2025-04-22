import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerColegioComponent } from './ver-colegio.component';
import { SinDatosComponent } from "../../standalone/sin-datos/sin-datos.component";
import { VerColegioRoutingModule } from './ver-colegio-routing.module';




@NgModule({
  declarations: [
    VerColegioComponent
  ],
  imports: [
    CommonModule,
    SinDatosComponent,
    VerColegioRoutingModule
]
})
export class VerColegioModule { }

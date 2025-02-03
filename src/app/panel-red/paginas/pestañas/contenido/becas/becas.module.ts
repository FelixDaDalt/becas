import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDirective } from 'src/directiva/role.directiva';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { RouterModule } from '@angular/router';
import { BecasComponent } from './becas.component';
import { AltaBecaComponent } from './alta-beca/alta-beca.component';
import { BotonCargandoComponent } from "../../../../../../standalone/boton-cargando/boton-cargando.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitudBecaComponent } from './solicitud-beca/solicitud-beca.component';
import { ErrorFormularioComponent } from "../../../../../../standalone/error-formulario/error-formulario.component";



@NgModule({
  declarations: [
    BecasComponent,
    AltaBecaComponent,
    SolicitudBecaComponent
  ],
  imports: [
    RoleDirective,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SinDatosComponent,
    RouterModule.forChild([
        { path: '', component: BecasComponent }
    ]),
    BotonCargandoComponent,
    ErrorFormularioComponent
]
})
export class BecasModule { }

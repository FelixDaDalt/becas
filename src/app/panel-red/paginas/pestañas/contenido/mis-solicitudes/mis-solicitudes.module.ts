import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDirective } from 'src/directiva/role.directiva';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { RouterModule } from '@angular/router';
import { MisSolicitudesComponent } from './mis-solicitudes.component';
import { MisSolicitudRoutingModule } from './solicitud-routing.module';
import { VerSolicitudComponent } from './ver-solicitud/ver-solicitud.component';
import { FormatDniCuitPipe } from "../../../../../../pipes/formatoDniCuit.pipe";
import { DesestimarSolicitudComponent } from './ver-solicitud/desestimar-solicitud/desestimar-solicitud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorFormularioComponent } from "../../../../../../standalone/error-formulario/error-formulario.component";
import { BotonCargandoComponent } from "../../../../../../standalone/boton-cargando/boton-cargando.component";
import { DarBajaSolicitudComponent } from './ver-solicitud/dar-baja-solicitud/dar-baja-solicitud.component';
import { FilterPipeModule } from 'ngx-filter-pipe';




@NgModule({
  declarations: [
    MisSolicitudesComponent,
    VerSolicitudComponent,
    DesestimarSolicitudComponent,
    DarBajaSolicitudComponent
  ],
  imports: [
    RoleDirective,
    CommonModule,
    SinDatosComponent,
    MisSolicitudRoutingModule,
    FormatDniCuitPipe,
    ReactiveFormsModule,
    ErrorFormularioComponent,
    BotonCargandoComponent,
    FormsModule,
    FilterPipeModule
]
})
export class MisSolicitudesModule { }

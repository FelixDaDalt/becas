import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDirective } from 'src/directiva/role.directiva';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { RouterModule } from '@angular/router';
import { SolicitudesComponent } from './solicitudes.component';
import { VerSolicitudComponent } from './ver-solicitud/ver-solicitud.component';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { FormatDniCuitPipe } from "../../../../../../pipes/formatoDniCuit.pipe";
import { ResolverSolicitudComponent } from './ver-solicitud/resolver-solicitud/resolver-solicitud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorFormularioComponent } from "../../../../../../standalone/error-formulario/error-formulario.component";
import { BotonCargandoComponent } from "../../../../../../standalone/boton-cargando/boton-cargando.component";
import { DarBajaSolicitudComponent } from './ver-solicitud/dar-baja-solicitud/dar-baja-solicitud.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  declarations: [
    SolicitudesComponent,
    VerSolicitudComponent,
    ResolverSolicitudComponent,
    DarBajaSolicitudComponent
  ],
  imports: [
    RoleDirective,
    CommonModule,
    SinDatosComponent,
    SolicitudRoutingModule,
    FormatDniCuitPipe,
    ReactiveFormsModule,
    ErrorFormularioComponent,
    BotonCargandoComponent,
    FilterPipeModule,
    FormsModule,
    NgxDatatableModule
]
})
export class SolicitudesModule { }

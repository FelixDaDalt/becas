import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { RedesTabComponent } from './redes-tab.component';
import { RoleDirective } from 'src/directiva/role.directiva';
import { EditarRedComponent } from './editar-red/editar-red.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotonCargandoComponent } from "../../../../../../standalone/boton-cargando/boton-cargando.component";
import { ErrorFormularioComponent } from "../../../../../../standalone/error-formulario/error-formulario.component";
import { EditarMiembrosComponent } from './editar-miembros/editar-miembros.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipeModule } from 'ngx-filter-pipe';



@NgModule({
  declarations: [
    RedesTabComponent,
    EditarRedComponent,
    EditarMiembrosComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    SinDatosComponent,
    RoleDirective,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: '', component: RedesTabComponent }
    ]),
    BotonCargandoComponent,
    ErrorFormularioComponent,
    NgbTooltipModule,
    FormsModule,
    FilterPipeModule
]
})
export class RedesTabModule { }

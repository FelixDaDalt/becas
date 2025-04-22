import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ColegiosTabComponent } from './colegios-tab.component';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { BotonCargandoComponent } from "../../../../../../standalone/boton-cargando/boton-cargando.component";
import { ErrorFormularioComponent } from "../../../../../../standalone/error-formulario/error-formulario.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditarColegioComponent } from './editar-colegio/editar-colegio.component';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RoleDirective } from 'src/directiva/role.directiva';



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
    NgSelectModule,
    NgbTooltipModule,
    FilterPipeModule,
    FormsModule,
    NgbDropdownModule,
    NgxDatatableModule,
    RoleDirective
]
})
export class ColegiosTabModule { }

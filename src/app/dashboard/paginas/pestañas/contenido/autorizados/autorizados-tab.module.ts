import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { RoleDirective } from 'src/directiva/role.directiva';
import { AutorizadosTabComponent } from './autorizados-tab.component';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  declarations: [AutorizadosTabComponent],
  imports: [
    RoleDirective,
    CommonModule,
    SinDatosComponent,
    RouterModule.forChild([
      { path: '', component: AutorizadosTabComponent }
    ]),
    NgbTooltipModule,
    FilterPipeModule,
    FormsModule,
    NgbDropdownModule,
    NgxDatatableModule
  ]
})
export class AutorizadosTabModule { }

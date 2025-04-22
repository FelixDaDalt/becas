import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsablesTabComponent } from './responsables-tab.component';
import { RouterModule } from '@angular/router';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { RoleDirective } from 'src/directiva/role.directiva';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  declarations: [ResponsablesTabComponent],
  imports: [
    RoleDirective,
    CommonModule,
    SinDatosComponent,
    RouterModule.forChild([
      { path: '', component: ResponsablesTabComponent }
    ]),
    NgbTooltipModule,
    FilterPipeModule,
    FormsModule,
    NgbDropdownModule,
    NgxDatatableModule
  ]
})
export class ResponsablesTabModule { }

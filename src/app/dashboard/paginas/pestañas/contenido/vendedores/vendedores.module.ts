import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { vendedorComponent } from './vendedor.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { RoleDirective } from 'src/directiva/role.directiva';




@NgModule({
  declarations: [
    vendedorComponent
  ],
    imports: [
      RoleDirective,
      CommonModule,
      SinDatosComponent,
      RouterModule.forChild([
        { path: '', component: vendedorComponent }
      ]),
      NgbTooltipModule,
      FilterPipeModule,
      FormsModule,
      NgbDropdownModule,
      NgxDatatableModule
    ]
  })
export class VendedoresModule { }

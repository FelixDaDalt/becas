import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsablesTabComponent } from './responsables-tab.component';
import { RouterModule } from '@angular/router';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { RoleDirective } from 'src/directiva/role.directiva';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FormsModule } from '@angular/forms';



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
    FormsModule
  ]
})
export class ResponsablesTabModule { }

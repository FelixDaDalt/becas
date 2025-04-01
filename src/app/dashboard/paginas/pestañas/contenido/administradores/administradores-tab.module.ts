import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdministradoresTabComponent } from './administradores-tab.component';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AdministradoresTabComponent],
  imports: [
    CommonModule,
    SinDatosComponent,
    RouterModule.forChild([
      { path: '', component: AdministradoresTabComponent }
    ]),
    NgbTooltipModule,
    FilterPipeModule,
    FormsModule
  ]
})
export class AdministradoresTabModule { }

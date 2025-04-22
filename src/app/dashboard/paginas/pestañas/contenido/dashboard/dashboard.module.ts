import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { NgbAccordionModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';




@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: '', component: DashboardComponent }
    ]),
    SinDatosComponent,
    NgbTooltipModule,
    FormsModule,
    NgbAccordionModule,
    NgApexchartsModule,


]
})
export class DashboardModule { }

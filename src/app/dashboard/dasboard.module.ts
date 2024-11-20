import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { EstructuraModule } from 'src/estructura/estructura.module';
import { DasboardComponent } from './dasboard.component';
import { RoleDirective } from 'src/directiva/role.directiva';
import { MisDatosColumnaComponent } from './mis-datos-columna/mis-datos-columna.component';
import { breadcrumb } from "../../standalone/breadcrumb/breadcrumb.component";



@NgModule({
  declarations: [
    DasboardComponent,
    MisDatosColumnaComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    EstructuraModule,
    RoleDirective,
    breadcrumb
]
})
export class DasboardModule { }

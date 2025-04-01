import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelRedComponent } from './panel-red.component';
import { PanelRedRoutingModule } from './panel-red-routing.module';
import { EstructuraModule } from "../../estructura/estructura.module";
import { breadcrumb } from "../../standalone/breadcrumb/breadcrumb.component";
import { MiColegioColumnaComponent } from './mi-colegio-columna/mi-colegio-columna.component';
import { FormatDniCuitPipe } from "../../pipes/formatoDniCuit.pipe";
import { DasboardModule } from "../dashboard/dasboard.module";
import { RoleDirective } from 'src/directiva/role.directiva';

@NgModule({
  declarations: [
    PanelRedComponent,
    MiColegioColumnaComponent
  ],
  imports: [
    CommonModule,
    PanelRedRoutingModule,
    EstructuraModule,
    breadcrumb,
    FormatDniCuitPipe,
    DasboardModule,
    RoleDirective
]
})
export class PanelRedModule { }

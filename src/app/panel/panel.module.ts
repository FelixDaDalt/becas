import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel.component';
import { PanelRoutingModule } from './panel-routing.module';
import { EstructuraModule } from "../../estructura/estructura.module";
import { breadcrumb } from "../../standalone/breadcrumb/breadcrumb.component";


@NgModule({
  declarations: [
    PanelComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    EstructuraModule,
    breadcrumb
]
})
export class PanelModule { }

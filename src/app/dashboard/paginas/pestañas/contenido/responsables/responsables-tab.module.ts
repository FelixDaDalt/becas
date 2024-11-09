import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsablesTabComponent } from './responsables-tab.component';
import { RouterModule } from '@angular/router';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';



@NgModule({
  declarations: [ResponsablesTabComponent],
  imports: [
    CommonModule,
    SinDatosComponent,
    RouterModule.forChild([
      { path: '', component: ResponsablesTabComponent }
    ])
  ]
})
export class ResponsablesTabModule { }

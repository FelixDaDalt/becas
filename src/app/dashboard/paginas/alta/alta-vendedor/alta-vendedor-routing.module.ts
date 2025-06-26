import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaVendedorComponent } from './alta-vendedor.component';




const routes: Routes = [
  {
    path: '',
    component: AltaVendedorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltaVendedorRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleColegioComponent } from './detalle-colegio.component';



const routes: Routes = [
  {
    path: '',
    component:DetalleColegioComponent ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleColegioRoutingModule { }

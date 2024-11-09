import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaColegioComponent } from './alta-colegio.component';


const routes: Routes = [
  {
    path: '',
    component: AltaColegioComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltaColegioRoutingModule { }

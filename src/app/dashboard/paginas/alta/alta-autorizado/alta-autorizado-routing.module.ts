import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaAutorizadoComponent } from './alta-autorizado.component';



const routes: Routes = [
  {
    path: '',
    component: AltaAutorizadoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltaAutorizadoRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaDelegadoComponent } from './alta-delegado.component';


const routes: Routes = [
  {
    path: '',
    component: AltaDelegadoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltaDelegadoRoutingModule { }

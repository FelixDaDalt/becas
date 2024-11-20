import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaResponsableComponent } from './alta-responsable.component';


const routes: Routes = [
  {
    path: '',
    component: AltaResponsableComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltaResponsableRoutingModule { }

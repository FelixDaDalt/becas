import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaRedComponent } from './alta-red.component';


const routes: Routes = [
  {
    path: '',
    component: AltaRedComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltaRedRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaAdministradorComponent } from './alta-administrador.component';



const routes: Routes = [
  {
    path: '',
    component: AltaAdministradorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltaAdministradorRoutingModule { }

import { VerColegioComponent } from './ver-colegio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TycPassGuard } from 'src/core/tyc-pass.Guard';
import { RoleGuard } from 'src/core/roleGuard';
import { SuspendidoGuard } from 'src/core/suspendidoGuard';



const routes: Routes = [
  {
    path: '',
    canActivate:[SuspendidoGuard],
    canActivateChild:[TycPassGuard],
    component: VerColegioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerColegioRoutingModule { }

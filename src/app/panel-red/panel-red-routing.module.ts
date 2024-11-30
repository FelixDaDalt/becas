import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TycPassGuard } from 'src/core/tyc-pass.Guard';
import { RoleGuard } from 'src/core/roleGuard';
import { SuspendidoGuard } from 'src/core/suspendidoGuard';
import { PanelRedComponent } from './panel-red.component';


const routes: Routes = [
  {
    path: '',
    canActivate:[SuspendidoGuard],
    canActivateChild:[TycPassGuard],
    component: PanelRedComponent,
    children:[
    {
      path:'',
      loadChildren: () => import('./paginas/pestañas/pestañas.module').then(m => m.PestañasRedModule)
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRedRoutingModule { }

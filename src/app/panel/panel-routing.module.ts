import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TycPassGuard } from 'src/core/tyc-pass.Guard';
import { RoleGuard } from 'src/core/roleGuard';
import { SuspendidoGuard } from 'src/core/suspendidoGuard';
import { PanelComponent } from './panel.component';

const routes: Routes = [
  {
    path: '',
    canActivate:[SuspendidoGuard],
    canActivateChild:[TycPassGuard],
    component: PanelComponent,
    children:[{
      path:'',
      loadChildren: () => import('../dashboard/dasboard.module').then(m => m.DasboardModule)
    },
    {
      path:'panel-red',
      loadChildren: () => import('../panel-red/panel-red.module').then(m => m.PanelRedModule)
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }

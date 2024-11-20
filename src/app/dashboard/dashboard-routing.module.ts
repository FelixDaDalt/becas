import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TycPassGuard } from 'src/core/tyc-pass.Guard';
import { DasboardComponent } from './dasboard.component';
import { RoleGuard } from 'src/core/roleGuard';
import { SuspendidoGuard } from 'src/core/suspendidoGuard';

const routes: Routes = [
  {
    path: '',
    canActivate:[SuspendidoGuard],
    canActivateChild:[TycPassGuard],
    component: DasboardComponent,
    children:[{
      path:'',
      loadChildren: () => import('./paginas/pestañas/pestañas.module').then(m => m.PestañasModule)
    },
    {
      path:'alta-colegio',
      canActivate:[RoleGuard],
      data: { roles: [0] },
      loadChildren: () => import('./paginas/alta/alta-colegio/alta-colegio.module').then(m => m.AltaColegioModule)
    },
    {
      path:'alta-administrador',
      canActivate:[RoleGuard],
      data: { roles: [0] },
      loadChildren: () => import('./paginas/alta/alta-administrador/alta-administrador.module').then(m => m.AltaAdministradorModule)
    },
    {
      path:'alta-responsable',
      canActivate:[RoleGuard],
      data: { roles: [0] },
      loadChildren: () => import('./paginas/alta/alta-responsable/alta-responsable.module').then(m => m.AltaResponsableModule)
    },
    {
      path:'alta-delegado',
      canActivate:[RoleGuard],
      data: { roles: [1] },
      loadChildren: () => import('./paginas/alta/alta-delegado/alta-delegado.module').then(m => m.AltaDelegadoModule)
    },
    {
      path:'alta-autorizado',
      canActivate:[RoleGuard],
      data: { roles: [1,2] },
      loadChildren: () => import('./paginas/alta/alta-autorizado/alta-autorizado.module').then(m => m.AltaAutorizadoModule)
    },
    {
      path:'alta-red',
      canActivate:[RoleGuard],
      data: { roles: [0] },
      loadChildren: () => import('./paginas/alta/alta-red/alta-red.module').then(m => m.AltaRedModule)
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

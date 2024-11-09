import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TycPassGuard } from 'src/core/tyc-pass.Guard';
import { DasboardComponent } from './dasboard.component';
import { RoleGuard } from 'src/core/roleGuard';

const routes: Routes = [
  {
    path: '',
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
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/authGuard';
import { SuspendidoComponent } from 'src/standalone/suspendido/suspendido.component';



const routes: Routes = [
  {
    path: 'admin/login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    data: { roles: [0,1,2,3] },
    loadChildren: () => import('./panel/panel.module').then(m => m.PanelModule)
  },
  { path: 'suspendido',
    component: SuspendidoComponent
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

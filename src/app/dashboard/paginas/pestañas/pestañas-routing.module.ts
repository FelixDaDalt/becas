import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TycPassGuard } from 'src/core/tyc-pass.Guard';
import { PestañasComponent } from './pestañas.component';
import { RoleGuard } from 'src/core/roleGuard';

const routes: Routes = [
  {
    path: '',
    component: PestañasComponent,
    children:[{
      path:'colegio',
      loadChildren: () => import('./contenido/detalle-colegio/detalle-colegio.module').then(m => m.DetalleColegioModule)
    },
    {
      path:'colegios',
      canActivate: [RoleGuard],
      data: { roles: [0] },
      loadChildren: () => import('./contenido/colegios/colegios-tab.module').then(m => m.ColegiosTabModule)
    },
    {
      path:'administradores',
      canActivate: [RoleGuard],
      data: { roles: [0] },
      loadChildren: () => import('./contenido/administradores/administradores-tab.module').then(m => m.AdministradoresTabModule)
    },
    {
      path:'responsables',
      canActivate: [RoleGuard],
      data: { roles: [0,1] },
      loadChildren: () => import('./contenido/responsables/responsables-tab.module').then(m => m.ResponsablesTabModule)
    },
    {
      path:'configuraciones',
      canActivate: [RoleGuard],
      data: { roles: [0] },
      loadChildren: () => import('./contenido/configuraciones-tab/configuraciones-tab.module').then(m => m.ConfiguracionesTabModule)
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PestañasRoutingModule { }

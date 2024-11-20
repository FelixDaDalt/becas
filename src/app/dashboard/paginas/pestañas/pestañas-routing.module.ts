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
      path:'delegados',
      canActivate: [RoleGuard],
      data: { roles: [1,2] },
      loadChildren: () => import('./contenido/delegados/delegados-tab.module').then(m => m.DelegadosTabModule)
    },
    {
      path:'autorizados',
      canActivate: [RoleGuard],
      data: { roles: [1,2,3] },
      loadChildren: () => import('./contenido/autorizados/autorizados-tab.module').then(m => m.AutorizadosTabModule)
    },
    {
      path:'redes',
      canActivate: [RoleGuard],
      data: { roles: [0,1,2,3] },
      loadChildren: () => import('./contenido/redes/redes-tab.module').then(m => m.RedesTabModule)
    },
    {
      path:'configuraciones',
      canActivate: [RoleGuard],
      data: { roles: [0] },
      loadChildren: () => import('./contenido/configuraciones-tab/configuraciones-tab.module').then(m => m.ConfiguracionesTabModule)
    },
    {
      path:'registros',
      canActivate: [RoleGuard],
      data: { roles: [0,1,2] },
      loadChildren: () => import('./contenido/registro/registro-tab.module').then(m => m.RegistroTabModule)
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PestañasRoutingModule { }

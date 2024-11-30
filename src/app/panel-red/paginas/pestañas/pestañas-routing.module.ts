import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TycPassGuard } from 'src/core/tyc-pass.Guard';
import { PestañasRedComponent } from './pestañas.component';
import { RoleGuard } from 'src/core/roleGuard';

const routes: Routes = [
  {
    path: '',
    component: PestañasRedComponent,
    children:[
    {
      path:'becas',
      loadChildren: () => import('./contenido/becas/becas.module').then(m => m.BecasModule)
    },
    {
      path:'solicitudes',
      loadChildren: () => import('./contenido/solicitudes/solicitudes.module').then(m => m.SolicitudesModule)
    },
    {
      path:'mis-solicitudes',
      loadChildren: () => import('./contenido/mis-solicitudes/mis-solicitudes.module').then(m => m.MisSolicitudesModule)
    },
    {
      path:'',
     redirectTo:'becas',
     pathMatch:'full'
    },]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PestañasRedRoutingModule { }

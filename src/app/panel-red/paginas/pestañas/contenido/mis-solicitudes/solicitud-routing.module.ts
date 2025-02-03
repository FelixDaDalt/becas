import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisSolicitudesComponent } from './mis-solicitudes.component';
import { VerSolicitudComponent } from './ver-solicitud/ver-solicitud.component';

const routes: Routes = [
  {
    path: '',
    component: MisSolicitudesComponent,
  },
  {
    path: 'ver-solicitud',
    component: VerSolicitudComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisSolicitudRoutingModule { }

import { SolicitudesComponent } from './solicitudes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerSolicitudComponent } from './ver-solicitud/ver-solicitud.component';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesComponent,
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
export class SolicitudRoutingModule { }

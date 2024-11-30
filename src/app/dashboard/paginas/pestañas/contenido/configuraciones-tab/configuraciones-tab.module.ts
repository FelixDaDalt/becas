import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfiguracionesTabComponent } from './configuraciones-tab.component';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';



@NgModule({
  declarations: [
    ConfiguracionesTabComponent
  ],
  imports: [
    CommonModule,
    SinDatosComponent,
    RouterModule.forChild([
      {
        path: '',
        component: ConfiguracionesTabComponent,
        children: [
          { path: 'terminos',
            loadChildren: () => import('./secciones/terminos/terminos.module').then(m => m.TerminosTabModule),
          },
          { path: 'zonas',
            loadChildren: () => import('./secciones/zonas/zonas.module').then(m => m.ZonasModule),
          },
          {
            path:'',
            redirectTo:'terminos',
            pathMatch:'full'
          }
        ]}
    ])
  ]
})
export class ConfiguracionesTabModule { }

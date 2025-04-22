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
          { path: 'planes',
            loadChildren: () => import('./secciones/planes/planes.module').then(m => m.PlanesModule),
          },
          { path: 'pagos',
            loadChildren: () => import('./secciones/formas_pago/formas_pago.module').then(m => m.FormasPagoModule),
          },
          { path: 'parametros',
            loadChildren: () => import('./secciones/parametros/parametros.module').then(m => m.ParametrosModule),
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

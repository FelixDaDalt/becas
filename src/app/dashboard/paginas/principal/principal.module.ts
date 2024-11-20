
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsMenuComponent } from './tabs-menu/tabs-menu.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TabsMenuComponent,
        children:[{
          path: '',
          redirectTo: 'colegios',  // Redirige la ruta vacía a la ruta 'colegios'
          pathMatch: 'full'
        },{
        path: 'responsables',
        loadChildren: () => import('./tabs/responsables-tab/responsables-tab.module').then(m => m.ResponsablesTabModule),
      },{
        path: 'colegios',
        loadChildren: () => import('./tabs/colegios-tab/colegios-tab.module').then(m => m.ColegiosTabModule),
      },{
        path: 'administradores',
        loadChildren: () => import('./tabs/administradores-tab/administradores-tab.module').then(m => m.AdministradoresTabModule),
      },{
        path: 'configuraciones',
        loadChildren: () => import('./tabs/configuraciones-tab/configuraciones-tab.module').then(m => m.ConfiguracionesTabModule),
      }]}
    ])
  ]
})
export class PrincipalModule { }

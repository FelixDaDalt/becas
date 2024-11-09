import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleColegioComponent } from './detalle-colegio.component';
import { DetalleColegioRoutingModule } from './detalle-colegio-routing.module';
import { FormatDniCuitPipe } from 'src/pipes/formatoDniCuit.pipe';
import { SinDatosComponent } from 'src/standalone/sin-datos/sin-datos.component';
import { RolClassDirective } from 'src/directiva/class.directiva';
import { RoleDirective } from 'src/directiva/role.directiva';






@NgModule({
  declarations: [
    DetalleColegioComponent,
  ],
  imports: [
    CommonModule,
    DetalleColegioRoutingModule,
    FormatDniCuitPipe,
    SinDatosComponent,
    RolClassDirective,
    RoleDirective
]
})
export class DetalleColegioModule { }

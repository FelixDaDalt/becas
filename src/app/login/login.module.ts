import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotonCargandoComponent } from 'src/standalone/boton-cargando/boton-cargando.component';
import { ErrorFormularioComponent } from 'src/standalone/error-formulario/error-formulario.component';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BotonCargandoComponent,
    ErrorFormularioComponent
  ],
})
export class LoginModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { EstructuraModule } from 'src/estructura/estructura.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from 'src/interceptors/error.interceptor';
import { TokenInterceptor } from 'src/interceptors/tokenInterceptor';
import { CargandoInterceptor } from 'src/interceptors/cargando.interceptor';
import { RoleDirective } from 'src/directiva/role.directiva';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    EstructuraModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CargandoInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { LOCALE_ID, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FieldsetModule} from 'primeng/fieldset';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { BuscarAfiliado } from './components/buscarAfiliado.component';
import { LoginComponent } from './components/login.component';
import { ListadoObraSoc } from './components/listadoObraSoc.component';
import { HomeComponent } from './components/home.component';

@NgModule({
  declarations: [
    AppComponent, BuscarAfiliado,LoginComponent,ListadoObraSoc,HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FieldsetModule,HttpClientModule,
    BrowserAnimationsModule,InputTextModule,ButtonModule,FormsModule,DialogModule
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: LOCALE_ID, useValue: 'es' },


  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

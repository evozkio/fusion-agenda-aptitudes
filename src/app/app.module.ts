import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { FiltroComponent } from './components/filtro/filtro.component';
import { DatosFiltroComponent } from './components/datos-filtro/datos-filtro.component';
import { DatoClienteComponent } from './components/dato-cliente/dato-cliente.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    AppComponent,
    FiltroComponent,
    DatosFiltroComponent,
    DatoClienteComponent,
    CabeceraComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    TabsModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

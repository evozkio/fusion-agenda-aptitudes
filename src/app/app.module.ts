import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiltroComponent } from './components/filtro/filtro.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ClienteService } from "./services/cliente.service";
import { HttpClientModule } from "@angular/common/http";
import { DatosClientesComponent } from './datos-clientes/datos-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    FiltroComponent,
    DatosClientesComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    PaginationModule.forRoot(),
    HttpClientModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }

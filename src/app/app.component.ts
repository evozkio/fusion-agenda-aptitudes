import { Component, OnInit } from '@angular/core';
import { TareaService } from './services/tarea.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(public tareaSvc: TareaService){

  }
}

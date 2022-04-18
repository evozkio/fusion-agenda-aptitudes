import { Component } from '@angular/core';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-datos-clientes',
  templateUrl: './datos-clientes.component.html',
  styleUrls: ['./datos-clientes.component.scss']
})
export class DatosClientesComponent {

  constructor(public tareaSvc: TareaService) { 
  }

 

}

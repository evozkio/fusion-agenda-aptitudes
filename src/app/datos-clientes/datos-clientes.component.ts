import { Component } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-datos-clientes',
  templateUrl: './datos-clientes.component.html',
  styleUrls: ['./datos-clientes.component.scss']
})
export class DatosClientesComponent {

  constructor(public tareaSvc: TareaService, private clienteSvc: ClienteService ) { 
  }

   crearCliente(){
   }

   modificarCliente(){
   }

   borrarCliente(){
     let filtro={
       id : this.tareaSvc.seleccionCliente.id
    }
    console.log(this.tareaSvc.seleccionCliente);
     this.clienteSvc.deleteCliente(filtro).subscribe(
      (data) => {console.log(data);},
      (error) => {alert(error.mensaje);
                console.log(error);
      }
    )
   }

}

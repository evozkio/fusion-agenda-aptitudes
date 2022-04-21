import { Component } from '@angular/core';
import { ClienteEmpresa } from '../models/cliente-empresa.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-datos-clientes',
  templateUrl: './datos-clientes.component.html',
  styleUrls: ['./datos-clientes.component.scss']
})
export class DatosClientesComponent {

  constructor( public clienteSvc: ClienteService ) { 
  }

   crearCliente(){
   }

   modificarCliente(){
   }

   borrarCliente(){
     let filtro={
       id : this.clienteSvc.seleccionCliente.id
    }
     this.clienteSvc.deleteCliente(filtro).subscribe(
      (data) => {
        console.log(data);
        this.actualizarClientes();
      },
      (error) => {alert(error.mensaje);
                console.log(error);
      }
    );
    
  }

  actualizarClientes(){
    this.clienteSvc.getCliente(this.clienteSvc.filtros).subscribe(
      (data) => { 
        console.log(data);
        this.clienteSvc.clientes = data.data; 
        this.clienteSvc.clientes.sort(function (a:ClienteEmpresa, b:ClienteEmpresa) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          return 0;
        });
        this.clienteSvc.seleccionCliente = this.clienteSvc.clientes[0];
        this.clienteSvc.pagina = 1;
      },
      (error) => {alert("No se han podido cargar los datos!");}
    )
  }

}

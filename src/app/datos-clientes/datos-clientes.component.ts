import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClienteEmpresa } from '../models/cliente-empresa.model';


@Component({
  selector: 'app-datos-clientes',
  templateUrl: './datos-clientes.component.html',
  styleUrls: ['./datos-clientes.component.scss']
})
export class DatosClientesComponent {

  @Input() clientePadre:ClienteEmpresa= new ClienteEmpresa({});
  @Output() borrar = new EventEmitter();
  @Output() cerrar = new EventEmitter();


  crearCliente(){
  }

  modificarCliente(){
  }

  borrarCliente(){
    this.borrar.emit();
  }

  cerrarCliente(){
    this.cerrar.emit();
  }

}

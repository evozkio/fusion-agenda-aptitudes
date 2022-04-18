import { Component} from '@angular/core';
import {faSearch,faTrash} from '@fortawesome/free-solid-svg-icons'
import { ClienteEmpresa } from 'src/app/models/cliente-empresa.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent {

  nombre:string = '';
  alias:string = '';
  razon_social:string = '';
  documento:string = '';
  comercial:string = '';
  email:string = '';
  telefono:string = '';
  direccion:string = '';
  localidad:string = '';
  provincia:string = '';
  cp:string = '';



  faSearch=faSearch;
  faTrash=faTrash;
  bsConfig:any;
  

  constructor(public tareaSvc: TareaService, private clienteSvc: ClienteService){
  }


  actionBuscar(){
    let filtros = {
      nombre : this.nombre,
      alias : this.alias,
      razon_social : this.razon_social,
      documento: this.documento,
      comercial : this.comercial,
      email : this.email,
      telefono : this.telefono,
      direccion : this.direccion,
      localidad : this.localidad,
      provincia : this.provincia,
      cp : this.cp,
      activo :'1'
    }

    this.clienteSvc.getCliente(filtros).subscribe(
      (data) => { 
        this.tareaSvc.clientes = data.data; 
        this.tareaSvc.clientes.sort(function (a:ClienteEmpresa, b:ClienteEmpresa) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          return 0;
        });
      },
      (error) => {alert("No se han podido cargar los datos!");}
    )
  }


}

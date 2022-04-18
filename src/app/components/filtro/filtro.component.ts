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
  codigo:string= '';
  alias:string = '';
  documento:string = '';
  localidad:string = '';



  faSearch=faSearch;
  faTrash=faTrash;
  bsConfig:any;
  

  constructor(public tareaSvc: TareaService, private clienteSvc: ClienteService){
  }


  actionBuscar(){
    let filtros = {
      codigo : this.codigo,
      alias : this.alias,
      documento: this.documento,
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

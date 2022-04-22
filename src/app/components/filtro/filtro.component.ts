import { Component, EventEmitter, Output} from '@angular/core';
import {faSearch,faTrash,faUser} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent {
  codigo:string= '';
  alias:string = '';
  documento:string = '';
  provincia:string = '';
  activo:boolean = true;

  @Output() buscar = new EventEmitter<any>();
  @Output() crear = new EventEmitter()


  faUser=faUser;
  faSearch=faSearch;
  faTrash=faTrash;
  bsConfig:any;


  actionBuscar(){
    let filtros = {
      codigo : this.codigo,
      alias : this.alias,
      documento : this.documento,
      provincia : this.provincia,
      activo : this.activo ? 1:0
    }

    this.buscar.emit(filtros);
  }

  crearUsuario(){
    this.crear.emit();
  }
}

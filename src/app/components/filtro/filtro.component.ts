import { Component} from '@angular/core';
import {faSearch,faTrash} from '@fortawesome/free-solid-svg-icons'
import { Tarea } from 'src/app/models/tarea.model';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent {
  filtroProductos:Tarea []= [];

  cliente:string = '';
  usuario:string = '';
  referencia:string = '';
  tipo:string = 'Todos';

  pendiente:boolean = false;
  recogiendo:boolean = false;
  recogida:boolean = false;
  desconsolidando:boolean = false;
  desconsolidada:boolean = false;
  entregada:boolean = false;
  incidencia:boolean = false;
  fecha:Date[] = [];

  faSearch=faSearch;
  faTrash=faTrash;
  bsConfig:any;
  

  constructor(public tareaSvc: TareaService){
    this.filtroProductos = tareaSvc.filtroTarea;
    this.ordenarListaPorFecha(tareaSvc.tareas)
  }


 
  
  actionBuscar(){
    this.filtrarlista();
    this.tareaSvc.pagina=1;
  }

  ordenarListaPorFecha(lista:any[]){
    lista.sort(function (a:any, b:any) {
      let fechaA:Date = new Date (a.fecha);
      let fechaB:Date = new Date (b.fecha);
      if (fechaA > fechaB) {
        return -1;
      }
      if (fechaA < fechaB) {
        return 1;
      }
      return 0;
    });
  }

  filtrarlista(){
    
    if(this.fecha.length !=0){
      this.fecha[0].setHours(0,0,0);
      this.fecha[1].setHours(23,59,59);
    }
    const filtered = this.tareaSvc.tareas.filter((element: Tarea) =>{
      return  this.contieneValor(element.cliente.alias_cliente,this.cliente)&& 
              this.contieneValor(element.usuario,this.usuario) &&
              this.contieneValor(element.referencia,this.referencia)&&
              (this.contieneValor(element.tipo,this.tipo)||this.tipo == 'Todos')&&
              this.filtrarPorEstado(element.estado)&&
              this.filtrarPorFecha(element.fecha);
    });
    this.tareaSvc.filtroTarea = filtered;
  }

  contieneValor(valor:string, valorBuscar:string):boolean{
    if(valor.toLowerCase().indexOf(valorBuscar.toLowerCase()) >= 0){
      return true;
    }
    return false;
  }

  filtrarPorEstado(estado:string):boolean{
    estado = estado.toLowerCase();
    if(this.pendiente){
      if(estado.toLowerCase() == 'pendiente'){
        return true
      }
    }
    if(this.recogiendo){
      if(estado.toLowerCase() == 'recogiendo'){
        return true
      }
    }
    if(this.recogida){
      if(estado.toLowerCase() == 'recogida'){
        return true
      }
    }
    if(this.desconsolidando){
      if(estado.toLowerCase() == 'desconsolidando'){
        return true
      }
    }
    if(this.desconsolidada){
      if(estado.toLowerCase() == 'desconsolidada'){
        return true
      }
    }
    if(this.entregada){
      if(estado.toLowerCase() == 'entregada'){
        return true
      }
    }
    if(this.incidencia){
      if(estado.toLowerCase() == 'incidencia'){
        return true
      }
    }
    if(!this.incidencia && !this.entregada && !this.desconsolidada && !this.desconsolidando && !this.recogida && !this.recogiendo && !this.pendiente){
      return true;
    }

    return false
  }

  filtrarPorFecha(fechaProducto:Date):boolean{
    let validar:boolean = false;
    if(this.fecha.length == 0){
      return true;
    }else{
      if(this.fecha[1] >= fechaProducto && this.fecha[0] <= fechaProducto){
        validar = true;
      }
    }
    
    
    return validar;
  }
}

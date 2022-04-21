import { Component, HostListener, Input, OnInit } from '@angular/core';
import {faExclamationCircle,faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import { ClienteService } from 'src/app/services/cliente.service';
import { ClienteEmpresa } from 'src/app/models/cliente-empresa.model';


@Component({
  selector: 'app-tabla-datos',
  templateUrl: './tabla-datos.component.html',
  styleUrls: ['./tabla-datos.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class TablaDatosComponent implements OnInit{

  faExclamationCircle = faExclamationCircle;
  faInfoCircle = faInfoCircle;
  cuerpoTabla:any;
  numeroElementos:number = 31;

  constructor(public clienteSvc: ClienteService){
 
    clienteSvc.getCliente(clienteSvc.filtros).subscribe(
      (data) => { 
        console.log(data);
        clienteSvc.clientes = data.data; 
        clienteSvc.clientes.sort(function (a:ClienteEmpresa, b:ClienteEmpresa) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          return 0;
        });
        clienteSvc.seleccionCliente = clienteSvc.clientes[0];
        clienteSvc.pagina = 1;
      },
      (error) => {alert("No se han podido cargar los datos!");}
    )


  }
 
  ngOnInit(): void {
    this.recalcularFilas();

  }

  @HostListener('window:resize', ['$event'])
    onResize(event:any) {
      this.recalcularFilas();
  }

  recalcularFilas(){
    let alto_div = 0;
    let div_tareas = document.getElementById("cuerpo-tabla");
    if(div_tareas!==null){
      alto_div = div_tareas.offsetHeight;
    }
    let num_pag = Math.floor(alto_div/30);
    this.cambiarPaginacion(1, num_pag);
  }

  cambiarPaginacion(pag: number, items:number){
    this.numeroElementos = items;
    setTimeout(() => this.clienteSvc.pagina = pag, 100);
  }


  
  cogerPrimerElementoComa(cadena:string):string{
    let valor:string [] = cadena.split(',');
    return valor[0];
  }

  seleccionCliente(cliente: ClienteEmpresa):void{
    this.clienteSvc.seleccionCliente =  new ClienteEmpresa (cliente);
    this.clienteSvc.mostrarCliente = true;
  }
}

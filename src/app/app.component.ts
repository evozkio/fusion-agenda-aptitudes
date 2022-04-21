import { Component, HostListener, OnInit } from '@angular/core';
import { ClienteEmpresa } from './models/cliente-empresa.model';
import { ClienteService } from './services/cliente.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {


  cuerpoTabla:any;
  numeroElementos:number=0;
  pagina:number = 1;
  clientes: ClienteEmpresa[] = [];
  clienteSeleccionado: ClienteEmpresa = new ClienteEmpresa({});
  mostrarCliente:boolean = false;
  filtros= {
    alias : '',
    activo : 1,
    provincia : '',
    documento : '',
    codigo : ''
  };

  constructor(public clienteSvc: ClienteService){
  }
 
  ngOnInit(): void {
    this.obtenerClientes();
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
    setTimeout(() => this.pagina = pag, 100);
  }


  
  cogerPrimerElementoComa(cadena:string):string{
    let valor:string [] = cadena.split(',');
    return valor[0];
  }

  seleccionCliente(cliente: ClienteEmpresa):void{
    this.clienteSeleccionado =  new ClienteEmpresa (cliente);
    this.mostrarCliente = true;
  }

  obtenerClientes(){
    this.clienteSvc.getCliente(this.filtros).subscribe(
      (data) => { 
        console.log(data);
        this.clientes = data.data; 
        this.clientes.sort(function (a:ClienteEmpresa, b:ClienteEmpresa) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          return 0;
        });
        this.clienteSeleccionado = this.clientes[0];
        this.pagina = 1;
      },
      (error) => {alert("No se han podido cargar los datos!");}
    );
  }

  crearCliente(){
    this.clienteSeleccionado = new ClienteEmpresa({});
  }

  buscarCliente(filtro:any){
    this.filtros = filtro;
    this.obtenerClientes();    
  }
}

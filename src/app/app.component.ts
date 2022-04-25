import { Component, HostListener, OnInit } from '@angular/core';
import { ClienteEmpresa } from './models/cliente-empresa.model';
import { ClienteService } from './services/cliente.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cuerpoTabla: any;
  numeroElementos: number = 0;
  numeroColumnas = 7;
  pagina: number = 1;
  clientes: ClienteEmpresa[] = [];
  clienteSeleccionado: ClienteEmpresa = new ClienteEmpresa({});
  mostrarCliente: boolean = false;

  filtros = {
    alias: '',
    activo: '',
    provincia: '',
    documento: '',
    codigo: '',
  };

  constructor(public clienteSvc: ClienteService) {}

  ngOnInit(): void {
    this.obtenerClientes();
    this.recalcularFilas();
    setTimeout(() => (this.numeroColumnas = this.recalcularColumnas()), 100);
  }

  @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.recalcularFilas();
      setTimeout(() => (this.numeroColumnas = this.recalcularColumnas()), 100);
  }

 

  recalcularColumnas(): number {
    let fila_Numero: number = 90;
    let fila_Alias: number = 200;
    let fila_Comercial: number = 100;
    let fila_Email: number = 350;
    let fila_Poblacion: number = 200;
    let fila_Provincia: number = 200;
    let fila_Telefono: number = 100;
    let total =
      fila_Numero +
      fila_Alias +
      fila_Comercial +
      fila_Email +
      fila_Poblacion +
      fila_Provincia +
      fila_Telefono;
    let numero_columnas = 7;
    let ancho_div = 0;
    let div_tabla = document.getElementById('contenedor-tabla');
    if (div_tabla !== null) {
      ancho_div = div_tabla.offsetWidth;
      if (ancho_div > total) {
   
        return 7;
      }
    
      total = total - fila_Poblacion;
      if (ancho_div > total) {
        console.log(ancho_div)
        console.log(total)
        return 6;
      }
      total = total - fila_Provincia;
      if (ancho_div > total) {
        return 5;
      }
      total = total - fila_Email
      if (ancho_div > total) {
        return 4;
      }
      total = total - fila_Numero;
      if (ancho_div > total) {
        return 3;
      }
      total = total - fila_Comercial;
      if (ancho_div > total) {
        return 2;
      }
      return 1;
      
    }

    return numero_columnas;
  }
  recalcularFilas() {
    let alto_div = 0;
    let div_tareas = document.getElementById('cuerpo-tabla');
    if (div_tareas !== null) {
      alto_div = div_tareas.offsetHeight;
    }
    let num_pag = Math.floor(alto_div / 30);
    this.cambiarPaginacion(1, num_pag);
  }

  cambiarPaginacion(pag: number, items: number) {
    this.numeroElementos = items;
    setTimeout(() => (this.pagina = pag), 100);
  }

  cogerPrimerElementoComa(cadena: string): string {
    let valor: string[] = cadena.split(',');
    return valor[0];
  }

  seleccionCliente(cliente: ClienteEmpresa): void {
    this.clienteSeleccionado = Object.assign(ClienteEmpresa, cliente);
    this.mostrarCliente = true;
    setTimeout(() => (this.numeroColumnas = this.recalcularColumnas()), 100);

  }

  obtenerClientes() {
    this.clienteSvc.getCliente(this.filtros).subscribe(
      (data) => {
        this.clientes = data.data
          .map((valor: any) => new ClienteEmpresa(valor))
          .sort((a: ClienteEmpresa, b: ClienteEmpresa) =>
            a.nombre.localeCompare(b.nombre)
          );

        this.clienteSeleccionado = this.clientes[0];
        this.pagina = 1;
      },
      (error) => {
        alert('No se han podido cargar los datos!');
      }
    );
  }
  actualizarClientes() {
    this.clienteSvc.getCliente(this.filtros).subscribe(
      (data) => {
        this.clientes = data.data
          .map((valor: any) => new ClienteEmpresa(valor))
          .sort((a: ClienteEmpresa, b: ClienteEmpresa) =>
            a.nombre.localeCompare(b.nombre)
          );
      },
      (error) => {
        alert('No se han podido cargar los datos!');
      }
    );
  }

  botonCrearCliente() {
    this.clienteSeleccionado = new ClienteEmpresa({});
    this.mostrarCliente = true;
    setTimeout(() => (this.numeroColumnas = this.recalcularColumnas()), 100);
  }

  buscarCliente(filtro: any) {
    this.filtros = filtro;
    this.obtenerClientes();
  }

  crearCliente() {
    this.clienteSvc.createCliente(this.darParametrosCrear()).subscribe(
      (data) => {
        this.actualizarClientes();
      },
      (error) => {
        alert('No se ha podido crear Cliente');
      }
    );
  }

  modificarCliente() {
    this.clienteSvc.updateCliente(this.darParametrosModificar()).subscribe(
      (data) => {
        this.actualizarClientes();
      },
      (error) => {
        alert('No se ha podido crear Cliente');
      }
    );
  }

  borrarCliente() {
    let filtro = {
      id: this.clienteSeleccionado.id,
    };
    this.clienteSvc.deleteCliente(filtro).subscribe(
      (data) => {
        this.obtenerClientes();
      },
      (error) => {
        alert('No se ha podido Borrar Cliente');
      }
    );
  }

  cerrarDatos() {
    this.mostrarCliente = false;
    setTimeout(() => (this.numeroColumnas = this.recalcularColumnas()), 100);
  }

  darParametrosCrear(): any {
    let parametros = {
      activo: this.clienteSeleccionado.activo ? 1 : 0,
      numero: this.clienteSeleccionado.numero,
      nombre: this.clienteSeleccionado.nombre,
      alias: this.clienteSeleccionado.alias,
      razon_social: this.clienteSeleccionado.razon_social,
      direccion: this.clienteSeleccionado.direccion,
      poblacion: this.clienteSeleccionado.poblacion,
      provincia: this.clienteSeleccionado.provincia,
      telefono: this.clienteSeleccionado.telefono,
      comercial: this.clienteSeleccionado.comercial,
      documento: this.clienteSeleccionado.documento,
      email:
        this.clienteSeleccionado.email == ''
          ? null
          : this.clienteSeleccionado.email,
      notas: this.clienteSeleccionado.notas,
      codigo_postal: this.clienteSeleccionado.cp,
    };

    return parametros;
  }

  darParametrosModificar(): any {
    let parametros = {
      idcliente: this.clienteSeleccionado.id,
      activo: this.clienteSeleccionado.activo ? 1 : 0,
      nombre: this.clienteSeleccionado.nombre,
      alias: this.clienteSeleccionado.alias,
      razon_social: this.clienteSeleccionado.razon_social,
      direccion: this.clienteSeleccionado.direccion,
      poblacion: this.clienteSeleccionado.poblacion,
      provincia: this.clienteSeleccionado.provincia,
      telefono: this.clienteSeleccionado.telefono,
      comercial: this.clienteSeleccionado.comercial,
      documento: this.clienteSeleccionado.documento,
      email:
        this.clienteSeleccionado.email == ''
          ? null
          : this.clienteSeleccionado.email,
      notas: this.clienteSeleccionado.notas,
      codigo_postal: this.clienteSeleccionado.cp,
    };

    return parametros;
  }
}

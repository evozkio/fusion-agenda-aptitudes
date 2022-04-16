import { Cliente } from './cliente.model';

export class Tarea{
    public id: number;
    public referencia: string;
    public logo: string;
    public usuario :string;
    public observacion: string;
    public cantidad: number;
    public estado: string;
    public fecha: Date;
    public tipo: string;
    public cliente: Cliente;

    constructor(json:any){
        this.id = json.id ?? '';
        this.referencia = json.referencia ?? '';
        this.logo = json.logo ?? '';
        this.usuario = json.usuario ?? '';
        this.observacion = json.observacion ?? '';
        this.cantidad = json.cantidad ?? '';
        this.estado = json.estado ?? '';
        this.fecha = new Date (json.fecha)?? Date.now();
        this.tipo = json.tipo ?? '';
        this.cliente = new Cliente(json.codigo_cliente ?? '', json.alias_cliente ?? '');
    }

    calcularHora():string{
        let hora = this.tieneDosDigitos(this.fecha.getHours());
        let minutos = this.tieneDosDigitos(this.fecha.getMinutes());
        return`${hora}:${minutos}`;
    }
    
    calcularDia():string{
        let dia = this.fecha.getDate()
        return this.tieneDosDigitos(dia);
    }

    calcularMes():string{
        let mes:number = this.fecha.getMonth();
        let cadena:string;
        switch (mes) {
          case 0:
            cadena = 'ene.';
            break;
          case 1:
            cadena = 'feb.';
            break;
          case 2:
            cadena = 'mar.';
            break;
          case 3:
            cadena = 'abr.';
            break;
          case 4:
            cadena = 'may.';
            break;
          case 5:
            cadena = 'jun.';
            break;
          case 6:
            cadena = 'jul.';
            break;
          case 7:
            cadena = 'ago.';
            break;
          case 8:
            cadena = 'sep.';
            break;
          case 9:
            cadena = 'oct.';
            break;
          case 10:
            cadena = 'nov.';
            break;
          case 11:
            cadena = 'dic.';
            break;
          default:
            cadena = 'error';  
            break;
        }
        return cadena;
    }

    calcularAnio():string{
        let cadena:string = this.fecha.getFullYear().toString(); 
        return cadena.slice(2,4);
    }

    tieneDosDigitos(numero:number):string{
        if (numero <10) {
            return "0"+numero;
        }
        return numero.toString();
    }
}
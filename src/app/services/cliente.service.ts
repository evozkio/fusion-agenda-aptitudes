import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import * as CryptoJS from 'crypto-js';

@Injectable()
export class ClienteService{

  private url: string = 'https://www.azurglobal.es/apiPracticas/clientes/';
  private cabecera: any = {};
  private nombre: string = 'CARLOS';
  private fecha:Date = new Date (Date.now());
  
  constructor(private http: HttpClient) {
    let anio = this.fecha.getFullYear();
    let mes = this.fecha.getMonth() < 9 ? '0'+(this.fecha.getMonth()+1) : this.fecha.getMonth()+1;
    let dia = this.fecha.getDate() < 9 ? '0'+this.fecha.getDate() : this.fecha.getDate();
    let mensaje = this.nombre+anio+mes+dia;
    var token = CryptoJS.SHA384(mensaje).toString();

    this.cabecera = {'X-Auth' : token}
  }

  getCliente(parametros: any):Observable<any>{
    return this.http.get<any>(this.url,{headers: this.cabecera, params: parametros});
  }
  deleteCliente(parametros: any) :Observable<any>{
    return this.http.delete<any>(this.url,{headers: this.cabecera, params: parametros});
  }
  updateCliente(parametros: any):Observable<any>{
    return this.http.put<any>(this.url,parametros, {headers: this.cabecera});
  }
  createCliente(parametros: any):Observable<any>{
    return this.http.post<any>(this.url,parametros, {headers: this.cabecera});
  }

}

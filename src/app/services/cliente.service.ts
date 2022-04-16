import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class ClienteService{

  private url: string = 'https://www.azurglobal.es/apiPracticas/clientes/';
  private cabecera: any = {};

  constructor(private http: HttpClient) {
    let token = 'c1ab9d186ebcde1055548c68cce2591c49837e694b86365d5d22d321d7a6b2cb917617b86f6e92ccab729879c3415837';


    this.cabecera = {'X-Auth' : token}
  }

  getCliente(parametros: any):Observable<any>{
    const filtros = {
      alias : '',
      activo: 1,
      provincia: '',
      documento: '',
      codigo: ''
    }
    return this.http.get<any>('https://www.azurglobal.es/apiPracticas/clientes/',{headers: this.cabecera, params: filtros});
  }

}

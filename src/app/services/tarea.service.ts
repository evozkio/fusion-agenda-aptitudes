import { ClienteEmpresa } from 'src/app/models/cliente-empresa.model';

export class TareaService {
    public pagina:number = 1;
    public clientes: ClienteEmpresa[] = []; 
    public seleccionCliente: ClienteEmpresa = new ClienteEmpresa({});
    public mostrarCliente:boolean = false;

}
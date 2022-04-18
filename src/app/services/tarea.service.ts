import { ClienteEmpresa } from 'src/app/models/cliente-empresa.model';

export class TareaService {
    public pagina:number = 1;
    public clientes: ClienteEmpresa[] = []; 
    public seleccionCliente: ClienteEmpresa = {
        "id":"",
        "numero":"",
        "alias":"",
        "nombre":"",
        "razon_social":"",
        "documento":"",
        "comercial":"",
        "email":"",
        "telefono":"",
        "direccion":"",
        "localidad":"",
        "provincia":"",
        "cp":"",
        "activo": false,
        "notas":""};
}
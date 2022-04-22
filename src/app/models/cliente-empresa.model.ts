export class ClienteEmpresa{
    public id:number;

    public numero: string;

    public alias: string;
    public nombre: string;
    public razon_social: string;
    public documento: string;

    public comercial: string;
    public email: string;
    public telefono: number;

    public direccion: string;
    public provincia: string;
    public cp: string;
    public poblacion: string;

    public activo: boolean;
    public notas: string;
    


    constructor(json:any ){
       this.id = json.idcliente ?? '';
       this.numero = json.numero ?? '';
       this.alias = json.alias ?? '';
       this.nombre = json.nombre ?? '';
       this.razon_social = json.razon_social ?? '';
       this.documento = json.documento ?? '';
       this.comercial = json.comercial ?? '';
       this.email = json.email ?? '';
       this.telefono = json.telefono ?? '';
       this.direccion = json.direccion ?? '';
       this.provincia = json.provincia ?? '';
       this.cp = json.cp ?? '';
       this.poblacion = json.poblacion ?? '';
       this.activo = (json.activo == '1');
       this.notas = json.notas ?? '';       
    }
}
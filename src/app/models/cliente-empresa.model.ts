export class ClienteEmpresa{
    public id:string;

    public numero: string;

    public alias: string;
    public nombre: string;
    public razon_social: string;
    public documento: string;

    public comercial: string;
    public email: string;
    public telefono: string;

    public direccion: string;
    public localidad: string;
    public provincia: string;
    public cp: string;

    public activo: boolean;
    public notas: string;
    


    constructor(json:any ){
       this.id = json.id ?? '';
       this.numero = json.numero ?? '';
       this.alias = json.alias ?? '';
       this.nombre = json.nombre ?? '';
       this.razon_social = json.razon_social ?? '';
       this.documento = json.documento ?? '';
       this.comercial = json.comercial ?? '';
       this.email = json.email ?? '';
       this.telefono = json.telefono ?? '';
       this.direccion = json.direccion ?? '';
       this.localidad = json.localidad ?? '';
       this.provincia = json.provincia ?? '';
       this.cp = json.cp ?? '';
       this.activo = (json.activo == '1');
       this.notas = json.notas ?? '';       
    }
}
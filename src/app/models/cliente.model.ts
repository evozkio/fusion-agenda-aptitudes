export class Cliente{

    public codigo_cliente: string;
    public alias_cliente: string;

    constructor(codigo_cliente:string, alias_cliente:string ){
        this.codigo_cliente = codigo_cliente ?? '';
        this.alias_cliente = alias_cliente ?? '';
    }
}
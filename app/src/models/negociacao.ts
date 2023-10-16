import { Imprimivel } from "../utils/imprimivel.js";

export class Negociacao implements Imprimivel{

    constructor(
        private _data : Date,
        public readonly quantidade : number,
        public readonly valor : number
    ){}

    get data() : Date {
        return new Date(this._data.getTime());
    }

    get volume() : number{
        return this.quantidade * this.valor;
    }

    static criaDe(dataString : string, quantidadeString : string, valorString : string) : Negociacao{
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ','));

        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);

        return new Negociacao(date, quantidade, valor);
    }

    paraTexto() : string {
        return `Data: ${this.data}
        Quantidade: ${this.quantidade}
        Valor: ${this.valor}`
    }
}
import { Negociacao } from "../models/negociacao.js";
export class NegociacoesService {
    ObterNegociacoesImportadas() {
        return fetch('http://localhost:8080/dados')
            .then(res => res.json())
            .then((dadosImportados) => {
            return dadosImportados.map(dado => {
                return new Negociacao(new Date(), dado.vezes, dado.montante);
            });
        });
    }
}

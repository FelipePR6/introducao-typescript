import { NegociacoesImportadas } from "../interfaces/negociacao-importada.js";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService{

    public ObterNegociacoesImportadas() : Promise<Negociacao[]>{
        return fetch('http://localhost:8080/dados')
        .then(res=> res.json())
        .then((dadosImportados: NegociacoesImportadas[]) => {
            return dadosImportados.map(dado => {
                return new Negociacao(
                    new Date(),
                    dado.vezes,
                    dado.montante
                );
            })
        });
    }

}
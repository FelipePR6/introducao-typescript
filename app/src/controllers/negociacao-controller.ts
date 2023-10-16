import { domInjector } from "../decorators/dom-injectior.js";
import { logarTempoDeExecucacao } from "../decorators/logar-tempo-de-execucao.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacaoesView } from "../views/negociacoes-view.js";

export class NegociacaoController{
    
    @domInjector('#data')
    private inputData : HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade : HTMLInputElement;
    @domInjector('#valor')
    private inputValor : HTMLInputElement;
    @domInjector('#botao-importa')
    private botaoImporta : HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacaoesView('#negociacoes-view');
    private mensagemView = new MensagemView('#mensagem-view');
    private negociacaoService = new NegociacoesService();

    constructor() {
        this.negociacoesView.update(this.negociacoes);
        this.botaoImporta.addEventListener('click', () => this.importaDados());
    }

    @logarTempoDeExecucacao()
    public adiciona() : void {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);

        if(!this.ehDiaUtil(negociacao.data)){
            this.mensagemView.update('Apenas negociações em dias úteis são aceitas');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.atualizaView();

        this.limparFormulario();
    }

    importaDados() : void{
        this.negociacaoService
            .ObterNegociacoesImportadas()
            .then(negociacoesImportadas => {
                for(let negociacao of negociacoesImportadas){
                    this.negociacoes.adiciona(negociacao);
                }
                this.atualizaView();
            });
    }

    private limparFormulario() : void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView() : void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("Sua negociação foi criada com sucesso!");
    }

    private ehDiaUtil(data : Date): boolean{
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }
}
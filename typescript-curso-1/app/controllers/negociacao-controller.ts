import { DiasDaSemana } from './../enums/dias-da-semana.js';
import { NegociacoesView } from './../views/negociacoes-views.js';
import { Negociacoes } from './../models/negociacoes.js';
import { Negociacao } from "../models/negociacao.js";
import { mensagemView } from '../views/mensagem-views.js';

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mesnsagemView = new mensagemView("#mensagemView");



    constructor() {
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacoes);

    }

    public adiciona() {

        const negociacao = this.criaNegociacao();
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mesnsagemView.update('Somente Dias Úteis')
            return;
        }
            this.negociacoes.adiciona(negociacao);
            this.limparFormulario();
            this.atualizaViaew();
        

    }

    private criaNegociacao(): Negociacao {
        const exp = /-/g;
        const date = new Date(this.inputData.value.replace(exp, ','));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacao(date, quantidade, valor);
    }

    private limparFormulario(): void {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();

    }

    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;

    }

    private atualizaViaew(): void {

        this.negociacoesView.update(this.negociacoes);
        this.mesnsagemView.update('Negociação adicionada com sucesso!');

    }
}
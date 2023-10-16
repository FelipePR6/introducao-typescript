import { NegociacaoController } from "./controllers/negociacao-controller.js";
const controler = new NegociacaoController();
const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        controler.adiciona();
    });
}
else {
    throw Error('Não foi possível inicar a aplicação. Verifique se o Form existe');
}

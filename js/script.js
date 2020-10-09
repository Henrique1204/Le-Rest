// Importa o arquivo modal.js
import Modal from "./modules/Modal.js";
import Busca from "./modules/Busca.js";

function iniciarModais() {
    // Seleciona os botões que ativam o modal...
    // ...e retorna uma nodeList com os elementos html.
    const btns = document.querySelectorAll("[data-btn]");

    // Percorre a nodeList e para cada item executa a função.
    btns.forEach((btn) => {
        // Pega o valor do data-btn e passa na variável.
        const modalNome = btn.dataset.btn;
        
        // Instância o objeto Modal e inicia ele.
        const modal = new Modal(`[data-modalContainer="${modalNome}"]`, `[data-modal="${modalNome}"]`).iniciar();
        
        // Adiciona o evento de click no botão.
        // Executa o método ativarModal da classe Modal (Arquivo ./modules/modal.js Linha 14).
        btn.addEventListener("click", modal.ativarModal);
    
        if (modalNome === "atualizar") {
            btn.addEventListener("click", (e) => {
                const dados = puxarValores(e);
                const modalElemento = document.querySelector(`[data-modal="${modalNome}"]`);

                modalElemento.querySelector('[name="nome"]').value = dados["nome"];
                modalElemento.querySelector(`option[value="${dados["categoria"]}"]`).setAttribute("selected", "");
                modalElemento.querySelector('[name="descricao"]').value = dados["descricao"];

                new Atualizar("#atualizar_item", dados["id"]).iniciar();
            });
        }

        if (modalNome === "deletar") {
            btn.addEventListener("click", (e) => {
                const opcaoNao = document.querySelector(`[data-modal="${modalNome}"] #nao`);

                opcaoNao.addEventListener("click", modal.fecharModal);
    
                new Deletar(".opcoes", puxarId(e)).iniciar();
            })
        }
    });
}

async function iniciar() {
    // Cria os elementos.
    const cards = await new Busca().criarCards();

    // Adiciona os cards no container main.
    cards.forEach((card) => document.querySelector("main").appendChild(card));

    // Inicia o script do modal.
    iniciarModais();
}

// Inicia os scripts quando a janela carrega.
window.addEventListener("load", iniciar);
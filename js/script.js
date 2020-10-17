// Importa o arquivo modal.js
import Modal from "./modules/Modal.js";
import Utilitarios from "./modules/Utilitarios.js"
import Login from "./modules/Login.js";
import Busca from "./modules/Busca.js";
import Deletar from "./modules/Deletar.js";
import Adicionar from "./modules/Adicionar.js";
import Atualizar from "./modules/Atualizar.js";

const util = new Utilitarios();

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
                const dados = util.puxarValores(e);
                const modalElemento = document.querySelector(`[data-modal="${modalNome}"]`);
                
                modalElemento.querySelector('[name="nome"]').value = dados["nome"];
                modalElemento.querySelector(`option[value="${dados["categoria"]}"]`).setAttribute("selected", "");
                modalElemento.querySelector('[name="descricao"]').value = dados["descricao"];
                
                new Atualizar("#atualizar_item", dados["id"]).iniciar();
            });
        }
        
        if (modalNome === "deletar") {
            btn.addEventListener("click", (e) => {
                const btnNao = document.querySelector(`[data-modal="${modalNome}"] #nao`);
                
                btnNao.addEventListener("click", modal.fecharModal);
                
                new Deletar(".opcoes", util.puxarId(e)).iniciar();
            });
        }
    });
}

async function iniciar() {
    const token = sessionStorage.getItem("token");
    
    if (token) {
        document.body.classList.add("logado");
        
        // Cria os elementos.
        const cards = await new Busca().criarCards();
        
        // Adiciona os cards no container main.
        cards.forEach((card) => document.querySelector(".container-card").appendChild(card));
        
        // Para a animação de loading
        document.querySelector("main").classList.remove("carregando");    
        
        new Adicionar("#adicionar_item").iniciar();
    } else {
        document.body.classList.remove("logado");
        
        new Login ("#login").iniciar();
    }
    
    iniciarModais();
}

iniciar();

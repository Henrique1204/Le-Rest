import Modal from "./Modal.js";
import Utilitarios from "./Utilitarios.js";
import Login from "./Login.js";
import Busca from "./Busca.js";
import Deletar from "./Deletar.js";
import Adicionar from "./Adicionar.js";
import Atualizar from "./Atualizar.js";

export default class App {
    login() {
        new Modal("login").iniciar();
        new Login ("#login").iniciar(); 
    }

    async buscar() {
        // Cria os elementos.
        const cards = await new Busca().criarCards();

        // Adiciona os cards no container main.
        cards.forEach((card) => document.querySelector(".container-card").appendChild(card));
    }

    atualizar() {
        const btns = document.querySelectorAll('[data-btn="atualizar"]');
        
        btns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const dados = new Utilitarios().puxarValores(e);
                const modalElemento = document.querySelector('[data-modal="atualizar"]');
                
                modalElemento.querySelector('[name="nome"]').value = dados["nome"];
                modalElemento.querySelector(`option[value="${dados["categoria"]}"]`).setAttribute("selected", "");
                modalElemento.querySelector('[name="descricao"]').value = dados["descricao"];
                
                new Atualizar("#atualizar_item", dados["id"]).iniciar();
            });
        });
    }

    deletar() {
        const btns = document.querySelectorAll('[data-btn="deletar"]');

        btns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                new Deletar(".opcoes", new Utilitarios().puxarId(e)).iniciar();
            });
        });
    }

    adicionar() {
        new Modal("adicionar").iniciar();
        new Adicionar("#adicionar_item").iniciar();
    }

    async iniciar() {
        const token = sessionStorage.getItem("token");
            
        if (token) {
            document.body.classList.add("logado");

            await this.buscar();

            // Para a animação de loading
            document.querySelector("main").classList.remove("carregando");

            this.adicionar();
            this.atualizar();
            this.deletar();
        } else {
            document.body.classList.remove("logado");
    
            this.login();
        }
    }
}

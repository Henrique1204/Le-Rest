// Importa a classe Modal.
import Modal from "./Modal.js";
// Importa a classe Utilitarios.
import Utilitarios from "./Utilitarios.js";
// Importa a classe Login.
import Login from "./Login.js";
// Importa a classe Busca.
import Busca from "./Busca.js";
// Importa a classe Deletar.
import Deletar from "./Deletar.js";
// Importa a classe Adicionar.
import Adicionar from "./Adicionar.js";
// Importa a classe Atualzar.
import Atualizar from "./Atualizar.js";

// Classe que será exportada.
export default class App {
    // Método que inicia o login.
    login() {
        // Instância a classe modal e inicia seus métodos.
        new Modal("login").iniciar();
        // Instância a classe Login e inicia seus métodos.
        new Login ("#login").iniciar(); 
    }

    // Método que inicia a busca.
    async buscar() {
        // Cria os elementos.
        const cards = await new Busca().criarCards();

        // Adiciona os cards no container main.
        cards.forEach((card) => document.querySelector(".container-card").appendChild(card));
    }

    // Método que inicia a adição de dados.
    adicionar() {
        // Instância a classe Modal e inicia seus métodos.
        new Modal("adicionar").iniciar();
        // Instância a classe Adicionar e inicia seus métodos.
        new Adicionar("#adicionar_item").iniciar();
    }

    // Método que inicia a edição dos dados.
    atualizar() {
        // Seleciona todos os botões de editar dos cards.
        const btns = document.querySelectorAll('[data-btn="atualizar"]');

        // Laço que percorre os botões selecionados.
        btns.forEach((btn) => {
            // Pra cada botão adiciona o evento de "click".
            btn.addEventListener("click", (e) => {
                // Puxa os valores do card para preencher os campos do formulário.
                // Faz isso chamando o método "puxarValores". (Arquivo Utilitarios.js | linha 61)
                const dados = new Utilitarios().puxarValores(e);
                // Seleciona o modal referente ao formulário de atualizar.
                const modalElemento = document.querySelector('[data-modal="atualizar"]');

                // Seleciona e preenche o campo com o name igual a "nome".
                modalElemento.querySelector('[name="nome"]').value = dados["nome"];
                // Seleciona a option com o value correspondente ao dado e adiciona...
                // ... o atributo "selected" para deixar a opção selecionada.
                modalElemento.querySelector(`option[value="${dados["categoria"]}"]`).setAttribute("selected", "");
                // Seleciona e preenche o campo com o name igual a "descricao".
                modalElemento.querySelector('[name="descricao"]').value = dados["descricao"];

                // Instância da classe Atualizar e inicia os métodos da classe.
                new Atualizar("#atualizar_item", dados["id"]).iniciar();
            });
        });
    }

    // Método que inicia a deleção dos dados.
    deletar() {
        // Seleciona todos os botões de remover dos cards.
        const btns = document.querySelectorAll('[data-btn="deletar"]');

        // Laço que percorre os botões selecionados.
        btns.forEach((btn) => {
            // Pra cada botão adiciona o evento de "click".
            btn.addEventListener("click", (e) => {
                // Instância a classe Deletar e inicia seus métodos.
                // Usa o método "puxarId" para selecionar o id correspondente...
                // ...  ao card que será deletado. (Arquivo Utilitarios.js | linha 42)
                new Deletar(".opcoes", new Utilitarios().puxarId(e)).iniciar();
            });
        });
    }

    // Método para inicar a classe.
    async iniciar() {
        // Puxa o token da session storage do navegador.
        const token = sessionStorage.getItem("token");

        // Testa se o token existe.
        if (token) {
            // Case exista, adiciona a classe "logado" no body.
            document.body.classList.add("logado");

            // Espera os dados serem buscados, chamando o método "buscar". (linha 27)
            await this.buscar();

            // Para a animação de loading removendo a classe "carregando" do elemento main.
            document.querySelector("main").classList.remove("carregando");

            // Chama o método "adicionar". (linha 36)
            this.adicionar();
            // Chama o método "atualizar". (linha 44)
            this.atualizar();
            // Chama o método "deletar". (linha 73)
            this.deletar();
        } else {
            // Caso não exista, remove a classe de logado do body.
            document.body.classList.remove("logado");
    
            // Chama o método "login". (linha 19)
            this.login();
        }

        // Retorna a própria instância da classe.
        return this;
    }
}

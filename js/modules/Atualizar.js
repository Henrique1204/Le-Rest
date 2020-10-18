// Importa a classe Utilitarios.
import Utilitarios from "./Utilitarios.js";

// Classe que será exportada.
export default class Atualizar {
    // Construtor da classe.
    constructor(form, id) {
        // Seleciona o formulário de onde sairá os dados.
        this.form = document.querySelector(form);
        // Seleciona o botão que envia o formulário.
        this.btn = document.querySelector(`${form} [type="button"]`);
        // Id o prato que será atualizado.
        this.id = id;
        // Cria uma instãncia da classe Utilitarios.
        this.util = new Utilitarios();

        // Define a referência do "this" do método adicionarEvento como sendo a própria classe. (linha 39)
        this.adicionarEvento = this.adicionarEvento.bind(this);
    }

    // Método para fazer a requisição ao servidor e atualiza os dados no banco de dados.
    atualizarDados(form, id) {
        // Puxando o token do navegador.
        const token = sessionStorage.getItem("token");

        // Objeto que será passado na requisição.
        const json = {
            id: id,
            // Coleta os dados do formulário com o método "coletarDados". (Arquivo Utilitarios.js | linha 4)
            dados: this.util.coletarDados(form),
        }

        // Fetch que faz a requisição ao servidor.
        fetch('http://localhost:3001/pratos', {
            method: "PUT",
            // Converte os dados coletados em string para enviar ao servidor.
            body: JSON.stringify(json),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "x-access-token": token
            }
        });
    }

    // Método que adiciona o evento da requisição.
    adicionarEvento() {
        // Adiciona o evento de click ao botão do formulário.
        this.btn.addEventListener("click", (e) => {
            // Previne o evento padrão.
            e.preventDefault();

            // Testa se os campos do formulários foram preenchido chamando...
            // ... o método "validarCampos". (Arquivo Utilitarios.js | Linha 22)
            if (this.util.validarCampos(this.form)) {
                // Caso os campos estejam preenchidos, executa o método "atualizarDados". (linha 22)
                this.atualizarDados(this.form, this.id);
            }
        });
    }

    // Método para inicar a classe.
    iniciar() {
        // Testa se o formulário e o botão que foram passado existem.
        if (this.form && this.btn && this.id) {
            // Caso exista ele chama o método "adicionarEvento". (linha 46)
            this.adicionarEvento();
        }

        // Retorna a própria instância da classe.
        return this;
    }
}

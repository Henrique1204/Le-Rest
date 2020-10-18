// Classe que será exportada.
export default class Deletar {
    // Construtor da classe.
    constructor(seletor, id) {
        // Seleciona o botão de confimação.
        this.btn = document.querySelector(`${seletor} #sim`);
        // Id o prato que será deletado.
        this.id = id;

        // Define a referência do "this" do método deletarDado como sendo a própria classe. (linha 14)
        this.deletarDado = this.deletarDado.bind(this);
    }

    // Método para fazer a requisição ao servidor e deleta os dados no banco de dados.
    deletarDado() {
        // Puxando o token do navegador.
        const token = sessionStorage.getItem("token");

        // Fetch que faz a requisição ao servidor.
        fetch('http://localhost:3001/pratos', {
            method: "DELETE",
            // Converte dado com o id em string para enviar ao servidor.
            body: JSON.stringify({ id: this.id }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "x-access-token": token
            }
        });
    }

    // Método para inicar a classe.
    iniciar() {
        // Testa se o botão que foi passado existe e se o id foi passado.
        if (this.btn && this.id) {
            // Caso exista ele adiciona o evento de "click" no botão de confirmação.
            // O evento executa o método "deletarDado". (linha 15)
            this.btn.addEventListener("click", this.deletarDado);
        }

        // Retorna a própria instância da classe.
        return this;
    }
}

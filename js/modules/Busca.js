// Importando a classe Card.
import Card from "./Card.js";

// Classe que será exportada
export default class Busca {
    // Método para buscar os pratos do servidor.
    async buscarDados() {
        // Puxando o token do navegador.
        const token = sessionStorage.getItem("token");

        // Fetch que buscar os dados no banco de dados.
        const req = await fetch ('http://localhost:3001/pratos',{
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "x-access-token": token
            }
        });

        // Convertando a resposta da requisição ao servidor em json.
        const dados = await req.json();
        // Retornando os dados buscados.
        return dados;
    }

    // Método para criar os cards com os dados.
    async criarCards() {
        // Chama o método "buscarDados" para buscar os dados. (linha 7)
        const dados = await this.buscarDados();

        // Laço que percorre a lista de dados.
        // Para cada dado ele instância a classe Card e contrói o card chamando a função...
        // ... "contruirCard" passando os dados que vão ficar no card. (Arquivo Card.js | Linha 93)
        const cards = dados.map((dado) => new Card().construirCard(dado.id, dado.nome, dado.categoria, dado.descricao));

        // Retorna a lista com os elementos cards preenchidos com os dados.
        return cards;
    }
}

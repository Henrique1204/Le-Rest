// Importa arquivo card
import Card from "./Card.js";

// Classe que será exportada
export default class Busca {
    async buscarToken() {
        const req = await fetch('http://localhost:3001/login',{
            method: "POST",
            body: JSON.stringify({user: "luiz", pwd: "123"}),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });

        const {token} = await req.json();
        return token;
    }

    async buscarDados() {
        const token = await this.buscarToken();
        const req = await fetch ('http://localhost:3001/pratos',{
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "x-access-token": token
            }
        });

        const dados = await req.json();
        return dados;
    }

    async criarCards() {
        const dados = await this.buscarDados();

        const cards = dados.map((dado) => new Card().construirCard(dado.id, dado.nome, dado.categoria, dado.descricao));

        return cards;
    }

}
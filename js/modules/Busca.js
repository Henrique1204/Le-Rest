import Card from "./Card.js";

export default class Busca {
    async buscarDados() {
        const token = sessionStorage.getItem("token");
        
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

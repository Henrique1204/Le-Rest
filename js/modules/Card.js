export default class Card {
    criarCard() {
        const card = document.createElement("div");
        card.classList.add("card-cardapio");

        return card;
    }

    criarIcone(caminho, alt) {
        const img = document.createElement("img");
        img.setAttribute("src", caminho);
        img.setAttribute("alt", alt);

        return img;
    }

    criarBotao(classe, dataBtn, caminho, alt) {
        const btn = document.createElement("button");
        btn.classList.add(classe);
        btn.setAttribute("data-btn", dataBtn);

        const icone = this.criarIcone(caminho, alt);
        btn.appendChild(icone);

        return btn;
    }

    criarTitulo(texto) {
        const div = document.createElement("div");
        div.classList.add("container-titulo");

        const titulo = document.createElement("h2");
        titulo.innerText = texto;
        div.appendChild(titulo);

        const span = document.createElement("span");
        span.innerText = "§";
        div.appendChild(span);

        return div;
    }

    criarDescricao(texto) {
        const p = document.createElement("p");
        p.innerText = texto;

        return p;
    }

    construirCard() {
        // Cria o card
        const card = this.criarCard();

        // Cria o botão de editar
        const btnEditar = this.criarBotao("icone-editar", "atualizar", "img/icon_editar.svg", "Editar item");
        card.appendChild(btnEditar);

        // Cria o botão de remover
        const btnRemover = this.criarBotao("icone-remover", "deletar", "img/icon_remover.svg", "Remover item");
        card.appendChild(btnRemover);

        // Cria o container do ícone
        const iconContainer = document.createElement("div");
        iconContainer.classList.add("icon-container");

        const icone = this.criarIcone("img/massas.svg", "Categoria massas");
        iconContainer.appendChild(icone);

        card.appendChild(iconContainer);

        const titulo = this.criarTitulo("Macarrão ao molho branco");
        card.appendChild(titulo);

        const descri = this.criarDescricao("Macarrão pena cozido em água, alho e cravo. Molho de azeite e cebola picada, creme de leite, requeijão, sal, coentro picado e pimenta calabresa moída");
        card.appendChild(descri);

        return card;
    }
}
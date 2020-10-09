export default class Card {
    criarCard(id) {
        const card = document.createElement("div");
        card.classList.add("card-cardapio");
        card.setAttribute("data-id", id);

        return card;
    }

    criarIcone(caminho, alt) {
        const img = document.createElement("img");
        img.setAttribute("src", caminho);
        img.setAttribute("alt", alt);

        return img;
    }

    criarBotao(classe, dataBtn, caminho, alt, id) {
        const btn = document.createElement("button");
        btn.classList.add(classe);
        btn.setAttribute("data-btn", dataBtn);
        btn.setAttribute("data-id", id);

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

    construirCard(id, nome, categoria, descricao) {
        // Cria o card
        const card = this.criarCard(id);

        // Cria o botão de editar
        const btnEditar = this.criarBotao("icone-editar", "atualizar", "img/icon_editar.svg", "Editar item", id);
        card.appendChild(btnEditar);

        // Cria o botão de remover
        const btnRemover = this.criarBotao("icone-remover", "deletar", "img/icon_remover.svg", "Remover item", id);
        card.appendChild(btnRemover);

        // Cria o container do ícone
        const iconContainer = document.createElement("div");
        iconContainer.classList.add("icon-container");

        const icone = this.criarIcone(`img/${categoria}.svg`,`Categoria ${categoria}`);
        iconContainer.appendChild(icone);

        icone.setAttribute("data-categoria", categoria)
        card.appendChild(iconContainer);

        const titulo = this.criarTitulo(nome);
        card.appendChild(titulo);

        const descri = this.criarDescricao(descricao);
        card.appendChild(descri);

        return card;
    }
}
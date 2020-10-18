// Importando classe com métodos para modal.
import Modal from "./Modal.js";

// Classe que será exportada.
export default class Card {
    // Método que cria o elemento card.
    criarCard(id) {
        // Cria um elemento div.
        const card = document.createElement("div");
        // Adiciona a classe "card-cardapio".
        card.classList.add("card-cardapio");
        // Adiciona o atributo data-id.
        card.setAttribute("data-id", id);

        // Retorno o elemento criado.
        return card;
    }

    // Método que cria o ícone do card.
    criarIcone(caminho, alt) {
        // Cria um elemento img
        const img = document.createElement("img");
        // Define o caminho para o ícone.
        img.setAttribute("src", caminho);
        // Define o texto alternativo do elemento img.
        img.setAttribute("alt", alt);

        // Retorna o elemento criado.
        return img;
    }

    // Método que cria um botão do card
    criarBotao(classe, dataBtn, caminho, alt, id) {
        // Cria o elemento button.
        const btn = document.createElement("button");
        // Adiciona a classe ao elemento.
        btn.classList.add(classe);
        // Adiciona o atributo data-btn.
        btn.setAttribute("data-btn", dataBtn);
        // Adiciona o atributo data-id.
        btn.setAttribute("data-id", id);

        // Cria o ícone do botão chamando o método crarIcone passando...
        // ... o caminho para imagem e o texto alternativo da imagem. (linha 20)
        const icone = this.criarIcone(caminho, alt);
        // Adiciona o ícone do botão ao elemento.
        btn.appendChild(icone);

        // Cria um objeto Modal e inicia seu métodos.
        new Modal(dataBtn, btn).iniciar();

        // Retorna o elemento;
        return btn;
    }

    // Método para criar o titulo do card.
    criarTitulo(texto) {
        // Cria um elemento div.
        const div = document.createElement("div");
        // Adiciona a classe "container-titulo".
        div.classList.add("container-titulo");

        // Cria um elemento h2.
        const titulo = document.createElement("h2");
        // Adiciona o conteúdo do h2.
        titulo.innerText = texto;
        // Adiciona o elemento h2 dentro do elemento div.
        div.appendChild(titulo);

        // Cria um elemento span
        const span = document.createElement("span");
        // Adiciona o conteúdo do span
        span.innerText = "§";
        // Adiciona o elemento span dentro do elemento div.
        div.appendChild(span);

        // Retorna o elemeento div.
        return div;
    }

    // Método para criar a descrição do card.
    criarDescricao(texto) {
        // Cria um elemento p.
        const p = document.createElement("p");
        // Adiciona o conteúdo do p.
        p.innerText = texto;

        // Retorna o elemento.
        return p;
    }

    // Método para adicionar os elementos ao elemento card.
    construirCard(id, nome, categoria, descricao) {
        // Cria o card chamando o método "criarCard" passando o id. (linha 7)
        const card = this.criarCard(id);

        // Cria o botão de editar chamando o método "criarBotao" passando...
        // ... a classe, o data-btn, o caminho para imagem, o texto alternativo e o id. (linha 33)
        const btnEditar = this.criarBotao("icone-editar", "atualizar", "img/icon_editar.svg", "Editar item", id);
        // Adiciona o botão de editar ao card.
        card.appendChild(btnEditar);

        // Cria o botão de remover chamando o método "criarBotao" passando...
        // ... a classe, o data-btn, o caminho para imagem, o texto alternativo e o id. (linha 33)
        const btnRemover = this.criarBotao("icone-remover", "deletar", "img/icon_remover.svg", "Remover item", id);
        // Adiciona o botão de remover ao card.
        card.appendChild(btnRemover);

        // Cria o container do ícone.
        const iconContainer = document.createElement("div");
        // Adiciona a classe "icon-container" ao elemento.
        iconContainer.classList.add("icon-container");

        // Cria o ícone do card chamando o método "criarIcone" passando...
        // ... o caminho pra imagem e o texto alternativo da imagem. (linha 20)
        const icone = this.criarIcone(`img/${categoria}.svg`,`Categoria ${categoria}`);
        iconContainer.appendChild(icone);

        // Adiciona o atributo "data-categoria" no elemento.
        icone.setAttribute("data-categoria", categoria);
        // Adiciona o ícone ao card.
        card.appendChild(iconContainer);

        // Cria o titulo do card chamando o método "criarTitulo" passando o nome. (linha 60)
        const titulo = this.criarTitulo(nome);
        // Adiciona o titulo ao card.
        card.appendChild(titulo);

        // Cria a descrição do card chamando o método "criarDescricao" passando a descricao. (linha 85)
        const descri = this.criarDescricao(descricao);
        // Adiciona a descrição ao card.
        card.appendChild(descri);

        // Retorna o card com os elementos dentro.
        return card;
    }
}
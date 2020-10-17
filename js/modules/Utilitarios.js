// Classe que vai se exportada pelo arquivo.
export default class Utilitarios {
    // Método para gerar dados para requisições.
    coletarDados(form) {
        // Seleciona os campos de dentro do formulário.
        const campos = form.querySelectorAll("[name]");

        // Objeto inicial que será retornado da função.
        const dados = {};

        // Laço que percorre os campos selecionados.
        campos.forEach((campo) => {
            // Cria um dado dentro do objeto dados.
            dados[campo.getAttribute("name")] = campo.value;
        });

        // Retorno dos dados construídos.
        return dados;
    }

    // Método que válida os campos. ( Só validamos se o campo está vazio )
    validarCampos(form) {
        // Seleciona os campos dentro do formulário.
        const campos = form.querySelectorAll("[name]");
        // Inicia o retorno da função como verdadeiro.
        let isValido = true;

        // Laço que percorre a os campos selecionados.
        campos.forEach((campo)=>{
            // Testa se o valor do campo não foi preenchido.
            if (!campo.value) {
                // Caso não tenha sido preenchido atualiza o valor de retorno para falso.
                isValido = false;
            }
        });

        // Retorno do método.
        return isValido;
    }

    // Método usado para puxar o id do card.
    puxarId(event) {
        // Vairável de retorno.
        let id;

        // Testa se onde foi clicado tem o valor do id.
        if (event.target.dataset.id) {
            // Caso tenha, adiciona o valor do id na variável de retorno.
            id = event.target.dataset.id;
        } else {
            // Caso não tenha ela busca o id no elemento pai de onde foi clicado.
            // E adiciona na variável de retorno.
            id = event.target.parentNode.dataset.id;
        }

        // Retorno da variável.
        return id;
    }

    // Método usado para puxar os dados do card de acordo com o id.
    puxarValores(event) {
        // Puxa o id.
        const id = this.puxarId(event);

        // Seleciona o card com o id correspondente.
        const card = document.querySelector(`[data-id="${id}"]`);

        // Cria o objeto com os dados do card.
        const dados = {
            "id": id,
            "nome": card.querySelector("h2").innerText,
            "categoria": card.querySelector("[data-categoria]").dataset.categoria,
            "descricao": card.querySelector("p").innerText
        }

        // Retorna o objeto criado com os dados do card.
        return dados;
    }
}

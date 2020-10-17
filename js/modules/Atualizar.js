import Utilitarios from "./Utilitarios.js";

export default class Atualizar {
    constructor(form, id) {
        this.form = document.querySelector(form);
        this.btn = document.querySelector(`${form} [type="button"]`);
        this.id = id;
        this.util = new Utilitarios();

        this.adicionarEvento = this.adicionarEvento.bind(this);
    }

    atualizarDados(form, id) {
        const token = sessionStorage.getItem("token");

        const json = {
            id: id,
            dados: this.util.coletarDados(form),
        }

        fetch('http://localhost:3001/pratos', {
            method: "PUT",
            body: JSON.stringify(json),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "x-access-token": token
            }
        });
    }

    adicionarEvento() {
        this.btn.addEventListener("click", (e) => {
            e.preventDefault();

            if (this.util.validarCampos(this.form)) {
                this.atualizarDados(this.form, this.id);
            }
        });
    }

    iniciar() {
        if (this.form && this.btn && this.id) {
            this.adicionarEvento();
        }

        return this;
    }
}

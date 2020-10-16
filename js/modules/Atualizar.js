import gerarJson from "./gerarJson.js";

export default class Atualizar {
    constructor(form, id) {
        this.form = document.querySelector(form);
        this.btn = document.querySelector(`${form} [type="button"]`);
        this.id = id;

        this.adicionarEvento = this.adicionarEvento.bind(this);
    }

    validarCampos() {
        const campos = this.form.querySelectorAll("[name]");
        let isValido = true;

        campos.forEach((campo) => {
            if (!campo.value) {
                isValido = false;
            }
        });

        return isValido;
    }

    atualizarDados(form, id) {
        const token = sessionStorage.getItem("token");

        const json = {
            id: id,
            dados: JSON.parse(gerarJson(form))
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

            if (this.validarCampos()) {
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

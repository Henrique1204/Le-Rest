import gerarJson from "./gerarJson.js";

export default class Atualizar {
    constructor(form, id) {
        this.form = document.querySelector(form);
        this.btn = document.querySelector(`${form} [type="button"]`);
        this.id = id;

        this.adicionarEvento = this.adicionarEvento.bind(this);
    }

    async buscarToken() {
        const req = await fetch('http://localhost:3001/login',{
            method: "POST",
            body: JSON.stringify({user: "luiz", pwd: "123"}),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        });

        const {token} = await req.json();
        return token;
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

    async atualizarDados(form, id) {
        const token = await this.buscarToken();

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

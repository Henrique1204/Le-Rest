import Utilitarios from "./Utilitarios.js"; 

export default class Login {
    constructor(form) {
        this.form = document.querySelector(form);
        this.btn = document.querySelector(`${form} button`);
        this.util = new Utilitarios();

        this.addEvento = this.addEvento.bind(this);
    }

    async buscarToken() {
        const msgErro = document.querySelector(".erro-login");
        msgErro.style.display = "none";

        const req = await fetch('http://localhost:3001/login',{
        method: "POST",
        body: JSON.stringify(this.util.coletarDados(this.form)),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        });

        const {token} = await req.json();

        if (token) {
            sessionStorage.setItem('token', token);
            window.location.reload();
        } else {
            msgErro.style.display = "block";
        }
    }

    addEvento() {
        this.btn.addEventListener("click", (e) => {
            e.preventDefault();

            if(this.util.validarCampos(this.form)){
                this.buscarToken();
            }

        });
    }

    iniciar() {
        if (this.form && this.btn) {
            this.addEvento();
        }

        return this;
    }
}

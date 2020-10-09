import gerarJson from "./gerarJson.js";

export default class Adicionar {
    constructor(seletor){
        this.form = document.querySelector(seletor);
        this.btn = document.querySelector(`${seletor} [type="button"]`);

        this.addEvento = this.addEvento.bind(this);
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

    async adicionarDados() {
        const token = await this.buscarToken();

        fetch('http://localhost:3001/pratos', {
            method: "POST",
            body: gerarJson(this.form),
            headers: {

                "Content-type": "application/json; charset=UTF-8",
                "x-access-token": token
            }
        });
    }

    validarCampos() {
        const campos = this.form.querySelectorAll("[name]");
        let isValido = true;

        campos.forEach((campo)=>{
            if (!campo.value) {
                isValido = false;
            }
        });

        return isValido;
    }

    addEvento(){
        this.btn.addEventListener("click", (e) => {
            e.preventDefault();

            if(this.validarCampos(this.form)){

                this.adicionarDados();
            }

        })        
    }

    iniciar() {
        if (this.form && this.btn) {
            this.addEvento();
        }

        return this;
    }
}

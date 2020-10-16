// Acho que deu, nem sei
import gerarJson from "./gerarJson.js";

export default class Adicionar {
    constructor(seletor){
        this.form = document.querySelector(seletor);
        this.btn = document.querySelector(`${seletor} [type="button"]`);

        this.addEvento = this.addEvento.bind(this);
    }

    adicionarDados() {
        const token = sessionStorage.getItem("token");

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

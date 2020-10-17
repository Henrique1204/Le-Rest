import Utilitarios from "./Utilitarios.js";

export default class Adicionar {
    constructor(seletor){
        this.form = document.querySelector(seletor);
        this.btn = document.querySelector(`${seletor} [type="button"]`);
        this.util = new Utilitarios();

        this.addEvento = this.addEvento.bind(this);
    }

    adicionarDados() {
        const token = sessionStorage.getItem("token");

        fetch('http://localhost:3001/pratos', {
            method: "POST",
            body: JSON.stringify(this.util.coletarDados(this.form)),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "x-access-token": token
            }
        });
    }

    addEvento(){
        this.btn.addEventListener("click", (e) => {
            e.preventDefault();

            if(this.util.validarCampos(this.form)){
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

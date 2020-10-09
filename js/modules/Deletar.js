export default class Deletar {
    constructor(form, id) {
        this.btn = document.querySelector(`${form} #sim`);
        this.id = id;

        this.deletarDado = this.deletarDado.bind(this);
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

    async deletarDado() {
        const token = await this.buscarToken();

        fetch('http://localhost:3001/pratos', {
            method: "DELETE",
            body: JSON.stringify({ id: this.id }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "x-access-token": token
            }
        });
    }

    iniciar() {
        if (this.btn && this.id) {
            this.btn.addEventListener("click", this.deletarDado);
        }

        return this;
    }
}
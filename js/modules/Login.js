export default class Login {
    constructor(form) {
        this.form = document.querySelector(form);
        this.btn = document.querySelector(`${form} button`);
    }

    coletarDados(campo) {
        const dados = {
            "user": this.form.querySelector("[name='usuario']").value,
            "pwd": this.form.querySelector("[name='senha']").value
        }

        return JSON.stringify(dados);
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

    async buscarToken() {
        const msgErro = document.querySelector(".erro-login");
        msgErro.style.display = "none";


        const req = await fetch('http://localhost:3001/login',{
        method: "POST",
        body: this.coletarDados(),
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

  addEvento(){
    this.btn.addEventListener("click", (e) => {
        e.preventDefault();

        if(this.validarCampos(this.form)){

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

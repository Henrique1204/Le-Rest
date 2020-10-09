export default(campos)=>{

    const dados ={

        "nome": campos.querySelector("[name='nome']").value,

        "categoria": campos.querySelector("[name='categorias']").value,

        "descricao": campos.querySelector("[name='descricao']").value

    }

    return JSON.stringify(dados);
}
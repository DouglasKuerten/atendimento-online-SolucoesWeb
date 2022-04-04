const botaoEnviar = document.getElementById("botaoEnviar");
botaoEnviar.addEventListener("click", function (event) {
    const data = new Date();
    const usuario = "Você diz";
    const mensagem = document.getElementById("inputMensagem");
    const dataMensagem = data.toLocaleDateString();
    const horaMensagem = data.toLocaleTimeString([], { timeStyle: 'short' });
    enviarMensagem(usuario, mensagem.value, dataMensagem, horaMensagem)
    mensagem.value = "";
    mensagem.focus();
});

carregaDados();





function carregaDados() {
    fetch("mensagens.JSON?fetch")
        .then(response => response.json())
        .then(resultado => resultado.forEach(({ usuario, mensagem, dataMensagem, horaMensagem }) => {
            enviarMensagem(usuario, mensagem, dataMensagem, horaMensagem);
        }));
}

function enviarMensagem(usuario, mensagem, dataMensagem, horaMensagem) {
    let html = "";
    if (mensagem != "") {
        const mensagemUL = document.createElement("ul");
        const mensagemLI = document.createElement("li");
        const usuarioH5 = document.createElement("h5");
        const mensagemH4 = document.createElement("h4");
        const horaMensagemH6 = document.createElement("h6");

        mensagemH4.innerText = mensagem;
        usuarioH5.innerText = usuario;
        horaMensagemH6.innerText = horaMensagem;

        mensagemLI.appendChild(usuarioH5);
        mensagemLI.appendChild(mensagemH4);
        mensagemLI.appendChild(horaMensagemH6);
        mensagemUL.appendChild(mensagemLI);
        mensagemUL.className = "chat-enviado"
        mensagemUL.id = "listagemMensagens"

        const listaMensagens = document.getElementById("divPrincipal");
        listaMensagens.appendChild(mensagemUL);
        listaMensagens.scrollTop = listaMensagens.scrollHeight;
    }
}
const api = "http://localhost:3000";
const usuario = JSON.parse(localStorage.getItem("usuario")) || null;

if (!usuario) {
    window.location.href = "../login";
}

const titulo = document.querySelector("header h1");
titulo.innerText = `Olá, ${usuario.nome}`;

function sair() {
    localStorage.removeItem("usuario");
    window.location.href = "../login";
}
const api = "http://localhost:3000/login";
const usuario = JSON.parse(localStorage.getItem("usuario")) || null;

if (usuario) {
    window.location.href = "../home";
}

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dados = {
        email: form.email.value,
        senha: form.senha.value
    };

    const resposta = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
    const resultado = await resposta.json();

    if (resposta.ok) {
        localStorage.setItem("usuario", JSON.stringify(resultado));
        window.location.href = "../home";
    } else {
        alert(resultado.error);
    }
});
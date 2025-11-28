const api = "http://localhost:3000";
const usuario = JSON.parse(localStorage.getItem("usuario")) || null;



document.addEventListener('DOMContentLoaded', function() {
            const usuario = JSON.parse(localStorage.getItem("usuario")) || { nome: "Usuário" };

            document.getElementById('user-name').textContent = usuario.nome;
            document.getElementById('user-avatar').textContent = usuario.nome.charAt(0).toUpperCase();
        });

        function sair() {
            if (confirm('Tem certeza que deseja sair do sistema?')) {
                localStorage.removeItem("usuario");
                window.location.href = "../login";
            }
        }
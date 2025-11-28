const api = "http://localhost:3000";
const usuario = JSON.parse(localStorage.getItem("usuario")) || null;

if (!usuario) {
    window.location.href = "../login";
}

async function producoes(produtoId, data, quantidade, tipo) {
    if (!data || quantidade <= 0) {
        alert("Por favor, insira uma data de produção válida e uma quantidade maior que zero.");
        return;
    }
    const dados = {
        produtoId: Number(produtoId),
        usuarioId: Number(usuario.id),
        quantidade: Number(quantidade),
        tipo: tipo,
        data: new Date(data).toISOString()
    };
    const response = await fetch(`${api}/producoes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    if (response.ok) {
        carregarEOrdenarProdutos();
    } else {
        const errorData = await response.json();
        alert(errorData.error);
    }
}

const carregarEOrdenarProdutos = async () => {
    const tbody = document.querySelector("tbody");
    try {
        const response = await fetch(`${api}/produtos`);
        const produtos = await response.json();
        produtos.sort((a, b) => a.nome.localeCompare(b.nome));
        tbody.innerHTML = "";
        produtos.forEach(produto => {
            const tr = document.createElement("tr");
            if (produto.estoque <= produto.estoqueMinimo) {
                tr.classList.add("estoque-baixo");
            }
            tr.innerHTML = `
                <td>${produto.id}</td>
                <td><img src="${produto.imagem}" alt="${produto.nome}" /></td>
                <td>${produto.nome}</td>
                <td>${produto.estoque}</td>
                <td>${produto.estoqueMinimo}</td>
                <td><button onclick="producoes(${produto.id}, document.getElementById('data${produto.id}').value, document.getElementById('quantidade${produto.id}').value, 'PRODUCAO')">Produzir</button></td>
                <td><input type="date" value="${new Date().toISOString().split('T')[0]}" id="data${produto.id}"></td>
                <td><input type="number" value="0" id="quantidade${produto.id}"></td>
                <td><button onclick="producoes(${produto.id}, document.getElementById('data${produto.id}').value, document.getElementById('quantidade${produto.id}').value, 'PEDIDO')">Pedido</button></td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }
};

carregarEOrdenarProdutos();
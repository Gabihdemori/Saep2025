// script.js - Cadastro de Produtos
const API_BASE = 'http://localhost:3000';
let produtos = [];
let editandoProduto = null;
let tipoProdutoAtual = 'ferramenta';

document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos();
    configurarEventos();
});

function configurarEventos() {
    document.querySelectorAll('.type-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.type-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            tipoProdutoAtual = this.dataset.type;
            document.getElementById('productType').value = tipoProdutoAtual;
            atualizarCamposFormulario();
            carregarProdutos();
        });
    });

    document.getElementById('productForm').addEventListener('submit', salvarProduto);
    document.getElementById('cancel-btn').addEventListener('click', cancelarEdicao);
    document.getElementById('searchInput').addEventListener('input', filtrarProdutos);
}

function atualizarCamposFormulario() {
    const tipoGroup = document.getElementById('tipo-group');
    const pesoGroup = document.getElementById('peso-group');
    const voltagemGroup = document.getElementById('voltagem-group');
    const descricaoGroup = document.getElementById('descricao-group');
    
    if (tipoProdutoAtual === 'ferramenta') {
        tipoGroup.style.display = 'block';
        pesoGroup.style.display = 'block';
        voltagemGroup.style.display = 'block';
        descricaoGroup.style.display = 'block';
    } else {
        tipoGroup.style.display = 'none';
        pesoGroup.style.display = 'none';
        voltagemGroup.style.display = 'none';
        descricaoGroup.style.display = 'none';
    }
}

async function carregarProdutos() {
    try {
        console.log('Carregando produtos do tipo:', tipoProdutoAtual);
        
        const endpoint = tipoProdutoAtual === 'ferramenta' ? '/ferramentas' : '/equipamentos';
        const response = await fetch(`${API_BASE}${endpoint}`);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        produtos = await response.json();
        console.log('Produtos carregados:', produtos);
        exibirProdutos(produtos);
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        alert('Erro ao carregar produtos. Verifique se o servidor está rodando na porta 3000.');
    }
}

function exibirProdutos(listaProdutos) {
    const tbody = document.getElementById('productsTableBody');
    
    if (listaProdutos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-state">
                    <i class="fas fa-box-open"></i>
                    <div>Nenhum produto cadastrado</div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = listaProdutos.map(produto => {
        const id = produto.id_ferramenta || produto.id_equipamento;
        const tipo = produto.tipo || '-';
        const descricao = produto.descricao || '-';
        
        return `
            <tr>
                <td>${id}</td>
                <td>${produto.nome}</td>
                <td>${produto.marca}</td>
                <td>${produto.modelo}</td>
                <td>${tipo}</td>
                <td>${descricao}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-sm btn-edit" onclick="editarProduto(${id})">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="btn-sm btn-delete" onclick="excluirProduto(${id})">
                            <i class="fas fa-trash"></i> Excluir
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function filtrarProdutos() {
    const termo = document.getElementById('searchInput').value.toLowerCase();
    const produtosFiltrados = produtos.filter(produto => 
        produto.nome.toLowerCase().includes(termo) ||
        produto.marca.toLowerCase().includes(termo) ||
        produto.modelo.toLowerCase().includes(termo) ||
        (produto.tipo && produto.tipo.toLowerCase().includes(termo))
    );
    exibirProdutos(produtosFiltrados);
}

async function salvarProduto(e) {
    e.preventDefault();
    
    if (!validarFormulario()) {
        return;
    }

    try {
        const formData = obterDadosFormulario();
        const endpoint = tipoProdutoAtual === 'ferramenta' ? '/ferramentas' : '/equipamentos';
        const method = editandoProduto ? 'PATCH' : 'POST';
        let url = `${API_BASE}${endpoint}`;
        
        if (editandoProduto) {
            const id = editandoProduto.id_ferramenta || editandoProduto.id_equipamento;
            url += `/${id}`;
        }

        console.log('Enviando dados para:', url);
        console.log('Método:', method);
        console.log('Dados:', formData);

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Produto não encontrado para edição. Talvez já tenha sido excluído.');
            }
            throw new Error(responseData.error || `Erro ${response.status} ao salvar produto`);
        }

        console.log('Produto salvo com sucesso:', responseData);

        alert('Produto salvo com sucesso!');
        limparFormulario();
        carregarProdutos();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao salvar produto: ' + error.message);

        if (editandoProduto) {
            carregarProdutos();
            cancelarEdicao();
        }
    }
}

function obterDadosFormulario() {
    const dados = {
        nome: document.getElementById('nome').value.trim(),
        marca: document.getElementById('marca').value.trim(),
        modelo: document.getElementById('modelo').value.trim()
    };

    if (tipoProdutoAtual === 'ferramenta') {
        dados.tipo = document.getElementById('tipo').value.trim();
        dados.peso = document.getElementById('peso').value.trim();
        dados.voltagem = document.getElementById('voltagem').value.trim();
        dados.descricao = document.getElementById('descricao').value.trim();
    }

    return dados;
}

function validarFormulario() {
    const nome = document.getElementById('nome').value.trim();
    const marca = document.getElementById('marca').value.trim();
    const modelo = document.getElementById('modelo').value.trim();
    
    if (!nome || !marca || !modelo) {
        alert('Por favor, preencha todos os campos obrigatórios (Nome, Marca e Modelo)');
        return false;
    }

    if (tipoProdutoAtual === 'ferramenta') {
        const tipo = document.getElementById('tipo').value.trim();
        if (!tipo) {
            alert('Por favor, preencha o campo Tipo para ferramentas');
            return false;
        }
    }

    return true;
}

function editarProduto(id) {
    const produto = produtos.find(p => 
        (p.id_ferramenta === id && tipoProdutoAtual === 'ferramenta') ||
        (p.id_equipamento === id && tipoProdutoAtual === 'equipamento')
    );
    
    if (!produto) {
        alert('Produto não encontrado na lista atual! Recarregue a página e tente novamente.');
        return;
    }

    editandoProduto = produto;
    
    document.getElementById('productId').value = id;
    document.getElementById('nome').value = produto.nome || '';
    document.getElementById('marca').value = produto.marca || '';
    document.getElementById('modelo').value = produto.modelo || '';
    
    if (tipoProdutoAtual === 'ferramenta') {
        document.getElementById('tipo').value = produto.tipo || '';
        document.getElementById('peso').value = produto.peso || '';
        document.getElementById('voltagem').value = produto.voltagem || '';
        document.getElementById('descricao').value = produto.descricao || '';
    }

    document.getElementById('form-title').textContent = 'Editar Produto';
    document.getElementById('submit-btn').textContent = 'Atualizar Produto';
    document.getElementById('cancel-btn').style.display = 'block';
    
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}

function cancelarEdicao() {
    editandoProduto = null;
    limparFormulario();
    document.getElementById('form-title').textContent = 'Cadastrar Novo Produto';
    document.getElementById('submit-btn').textContent = 'Cadastrar Produto';
    document.getElementById('cancel-btn').style.display = 'none';
}

function limparFormulario() {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
}

async function excluirProduto(id) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) {
        return;
    }

    try {
        const endpoint = tipoProdutoAtual === 'ferramenta' ? '/ferramentas' : '/equipamentos';
        const url = `${API_BASE}${endpoint}/${id}`;
        
        console.log('Excluindo produto:', url);

        const response = await fetch(url, {
            method: 'DELETE'
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Produto não encontrado. Talvez já tenha sido excluído.');
            }
            throw new Error(responseData.error || `Erro ${response.status} ao excluir produto`);
        }

        alert('Produto excluído com sucesso!');
        carregarProdutos();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao excluir produto: ' + error.message);
        carregarProdutos(); 
    }
}

function debugProdutos() {
    console.log('Produtos atuais:', produtos);
    console.log('Editando produto:', editandoProduto);
    console.log('Tipo atual:', tipoProdutoAtual);
}
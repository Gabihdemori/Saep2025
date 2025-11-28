// JavaScript para estoque.html - URLs Corrigidas
const API_BASE = 'http://localhost:3000';
let produtos = [];
let estoqueData = {};

document.addEventListener('DOMContentLoaded', function() {
    carregarDados();
    configurarEventos();
    document.getElementById('data').value = new Date().toISOString().split('T')[0];
});

function configurarEventos() {
    document.querySelectorAll('.type-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.type-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            document.getElementById('tipoMovimentacao').value = this.dataset.type;
        });
    });

    document.getElementById('movementForm').addEventListener('submit', registrarMovimentacao);
}

async function carregarDados() {
    try {
        console.log('Carregando dados do backend...');
        
        // CORREÇÃO: URLs diretas sem concatenação extra
        const ferramentas = await fetch(`${API_BASE}/ferramentas`).then(r => r.json());
        const equipamentos = await fetch(`${API_BASE}/equipamentos`).then(r => r.json());
        const vendas = await fetch(`${API_BASE}/vendas`).then(r => r.json());

        console.log('Ferramentas:', ferramentas);
        console.log('Equipamentos:', equipamentos);
        console.log('Vendas:', vendas);

        // Combina os produtos
        produtos = [
            ...ferramentas.map(f => ({
                ...f,
                tipo: 'ferramenta',
                id: f.id_ferramenta,
                tipo_produto: f.tipo,
                especificacoes: `${f.peso ? `Peso: ${f.peso}` : ''}${f.voltagem ? ` | Voltagem: ${f.voltagem}` : ''}`
            })),
            ...equipamentos.map(e => ({
                ...e,
                tipo: 'equipamento', 
                id: e.id_equipamento,
                tipo_produto: 'Equipamento Manual',
                especificacoes: 'Equipamento Manual'
            }))
        ];

        calcularEstoqueInicial(vendas);
        ordenarProdutos();
        atualizarSelectProdutos();
        atualizarTabelaInventario();

    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao carregar dados do servidor: ' + error.message);
    }
}

function calcularEstoqueInicial(vendas) {
    // Inicializa estoque
    produtos.forEach(produto => {
        let estoqueInicial = 50; // Estoque inicial fixo
        
        // Subtrai vendas existentes
        vendas.forEach(venda => {
            if (venda.id_ferramenta === produto.id || venda.id_equipamento === produto.id) {
                estoqueInicial -= venda.quantidade;
            }
        });
        
        estoqueData[produto.id] = {
            estoque: Math.max(0, estoqueInicial),
            estoque_minimo: produto.tipo === 'ferramenta' ? 5 : 2
        };
    });
}

function ordenarProdutos() {
    // Ordenação alfabética simples - Bubble Sort
    let n = produtos.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (produtos[j].nome.toLowerCase() > produtos[j + 1].nome.toLowerCase()) {
                // Troca os elementos
                let temp = produtos[j];
                produtos[j] = produtos[j + 1];
                produtos[j + 1] = temp;
            }
        }
    }
}

function atualizarSelectProdutos() {
    const select = document.getElementById('produto');
    select.innerHTML = '<option value="">Selecione um produto</option>';
    
    produtos.forEach(produto => {
        const estoqueInfo = estoqueData[produto.id];
        const option = document.createElement('option');
        option.value = produto.id;
        option.textContent = `${produto.nome} - ${produto.marca} ${produto.modelo} (Estoque: ${estoqueInfo.estoque})`;
        select.appendChild(option);
    });
}

function atualizarTabelaInventario() {
    const tbody = document.getElementById('inventoryTableBody');
    tbody.innerHTML = '';

    if (produtos.length === 0) {
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

    produtos.forEach(produto => {
        const estoqueInfo = estoqueData[produto.id];
        const isEstoqueBaixo = estoqueInfo.estoque <= estoqueInfo.estoque_minimo;
        const statusClass = isEstoqueBaixo ? 'stock-warning' : 'stock-ok';
        const statusText = isEstoqueBaixo ? 
            `⚠️ Estoque Baixo (Mín: ${estoqueInfo.estoque_minimo})` : 
            `✓ Estoque OK (Mín: ${estoqueInfo.estoque_minimo})`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.id}</td>
            <td>
                <div class="product-info">
                    <div class="product-icon">
                        <i class="fas fa-${produto.tipo === 'ferramenta' ? 'tools' : 'cogs'}"></i>
                    </div>
                    <div class="product-details">
                        <div class="product-name">${produto.nome}</div>
                        <div class="product-specs">${produto.tipo_produto || 'Equipamento'}</div>
                    </div>
                </div>
            </td>
            <td>${produto.tipo === 'ferramenta' ? 'Ferramenta' : 'Equipamento'}</td>
            <td>${produto.marca} ${produto.modelo}</td>
            <td>${produto.especificacoes || '-'}</td>
            <td><strong>${estoqueInfo.estoque}</strong></td>
            <td class="${statusClass}">${statusText}</td>
        `;
        tbody.appendChild(tr);
    });
}

async function registrarMovimentacao(e) {
    e.preventDefault();

    if (!validarMovimentacao()) {
        return;
    }

    const produtoId = parseInt(document.getElementById('produto').value);
    const tipo = document.getElementById('tipoMovimentacao').value;
    const data = document.getElementById('data').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const observacao = document.getElementById('observacao').value;

    const produto = produtos.find(p => p.id === produtoId);
    const estoqueInfo = estoqueData[produtoId];

    // Validação de saída
    if (tipo === 'saida') {
        if (estoqueInfo.estoque < quantidade) {
            alert(`❌ Quantidade insuficiente em estoque!\nEstoque atual: ${estoqueInfo.estoque}\nQuantidade solicitada: ${quantidade}`);
            return;
        }

        const novoEstoque = estoqueInfo.estoque - quantidade;
        if (novoEstoque < estoqueInfo.estoque_minimo) {
            const confirmar = confirm(
                `⚠️ ALERTA DE ESTOQUE BAIXO!\n\n` +
                `Estoque atual: ${estoqueInfo.estoque}\n` +
                `Estoque mínimo: ${estoqueInfo.estoque_minimo}\n` +
                `Estoque após movimentação: ${novoEstoque}\n\n` +
                `Deseja continuar com a saída?`
            );
            
            if (!confirmar) {
                return;
            }
        }
    }

    try {
        // Atualiza estoque local
        if (tipo === 'entrada') {
            estoqueInfo.estoque += quantidade;
        } else {
            estoqueInfo.estoque -= quantidade;
        }

        // Registra venda no backend
        const vendaData = {
            quantidade: quantidade,
            data_venda: new Date(data + 'T00:00:00').toISOString(),
            valor_total: 0,
            id_usuario: 1,
            observacao: observacao || `Movimentação de ${tipo} - ${produto.nome}`
        };

        if (produto.tipo === 'ferramenta') {
            vendaData.id_ferramenta = produtoId;
        } else {
            vendaData.id_equipamento = produtoId;
        }

        const response = await fetch(`${API_BASE}/vendas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vendaData)
        });

        if (!response.ok) {
            throw new Error('Erro ao registrar no servidor');
        }

        // Atualiza a interface
        ordenarProdutos();
        atualizarSelectProdutos();
        atualizarTabelaInventario();
        
        // Limpa o formulário
        document.getElementById('movementForm').reset();
        document.getElementById('data').value = new Date().toISOString().split('T')[0];
        document.querySelectorAll('.type-option').forEach(opt => opt.classList.remove('selected'));
        document.querySelector('.type-option.entrada').classList.add('selected');
        document.getElementById('tipoMovimentacao').value = 'entrada';
        
        alert('✅ Movimentação registrada com sucesso!');

    } catch (error) {
        console.error('Erro:', error);
        alert('❌ Erro ao registrar movimentação: ' + error.message);
        
        // Reverte a mudança local em caso de erro
        if (tipo === 'entrada') {
            estoqueInfo.estoque -= quantidade;
        } else {
            estoqueInfo.estoque += quantidade;
        }
    }
}

function validarMovimentacao() {
    const produto = document.getElementById('produto').value;
    const quantidade = document.getElementById('quantidade').value;
    const data = document.getElementById('data').value;

    if (!produto || !quantidade || !data) {
        alert('Por favor, preencha todos os campos obrigatórios (*)');
        return false;
    }

    if (parseInt(quantidade) <= 0) {
        alert('A quantidade deve ser maior que zero');
        return false;
    }

    return true;
}
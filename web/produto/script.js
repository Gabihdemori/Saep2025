
        // Variáveis globais
        let produtos = [];
        let editando = false;
        let produtoEditando = null;
        const api = "http://localhost:3000/ferramentas";

        document.addEventListener('DOMContentLoaded', function() {
            carregarProdutos();
            configurarEventos();
        });

        function configurarEventos() {

            document.querySelectorAll('.type-option').forEach(option => {
                option.addEventListener('click', function() {
                    document.querySelectorAll('.type-option').forEach(opt => opt.classList.remove('selected'));
                    this.classList.add('selected');
                    document.getElementById('productType').value = this.dataset.type;
                    toggleCamposEspecificos();
                });
            });

            document.getElementById('productForm').addEventListener('submit', salvarProduto);
            document.getElementById('searchInput').addEventListener('input', filtrarProdutos);
            document.getElementById('cancel-btn').addEventListener('click', cancelarEdicao);
        }

        function toggleCamposEspecificos() {
            const tipo = document.getElementById('productType').value;
            const tipoGroup = document.getElementById('tipo-group');
            const descricaoGroup = document.getElementById('descricao-group');

            if (tipo === 'ferramenta') {
                tipoGroup.style.display = 'block';
                descricaoGroup.style.display = 'block';
            } else {
                tipoGroup.style.display = 'none';
                descricaoGroup.style.display = 'none';
            }
        }

        // Carregar produtos
        async function carregarProdutos() {
            try {
            
                
                atualizarTabela();
            } catch (error) {
                console.error('Erro ao carregar produtos:', error);
                alert('Erro ao carregar produtos');
            }
        }

        function filtrarProdutos() {
            const termo = document.getElementById('searchInput').value.toLowerCase();
            atualizarTabela(termo);
        }

        function atualizarTabela(filtro = '') {
            const tbody = document.getElementById('productsTableBody');
            tbody.innerHTML = '';

            const produtosFiltrados = produtos.filter(produto => 
                produto.nome.toLowerCase().includes(filtro) ||
                produto.marca.toLowerCase().includes(filtro) ||
                produto.modelo.toLowerCase().includes(filtro)
            );

            if (produtosFiltrados.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="7" class="empty-state">
                            <i class="fas fa-box-open"></i>
                            <div>Nenhum produto encontrado</div>
                        </td>
                    </tr>
                `;
                return;
            }

            produtosFiltrados.forEach(produto => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.marca}</td>
                    <td>${produto.modelo}</td>
                    <td>${produto.tipo === 'ferramenta' ? produto.tipo_produto : 'Equipamento'}</td>
                    <td>${produto.descricao || '-'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-sm btn-edit" onclick="editarProduto(${produto.id})">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button class="btn-sm btn-delete" onclick="excluirProduto(${produto.id})">
                                <i class="fas fa-trash"></i> Excluir
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        // Salvar produto (criar ou editar)
        async function salvarProduto(e) {
            e.preventDefault();

            if (!validarFormulario()) {
                return;
            }

            const produto = {
                nome: document.getElementById('nome').value,
                marca: document.getElementById('marca').value,
                modelo: document.getElementById('modelo').value,
                tipo: document.getElementById('productType').value
            };

            if (produto.tipo === 'ferramenta') {
                produto.tipo_produto = document.getElementById('tipo').value;
                produto.descricao = document.getElementById('descricao').value;
            }

            try {
                if (editando) {
                    produto.id = produtoEditando.id;
                    const index = produtos.findIndex(p => p.id === produto.id);
                    produtos[index] = produto;
                } else {
                    produto.id = Math.max(...produtos.map(p => p.id)) + 1;
                    produtos.push(produto);
                }

                limparFormulario();
                atualizarTabela();
                alert(editando ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!');
            } catch (error) {
                console.error('Erro ao salvar produto:', error);
                alert('Erro ao salvar produto');
            }
        }

        function validarFormulario() {
            const nome = document.getElementById('nome').value.trim();
            const marca = document.getElementById('marca').value.trim();
            const modelo = document.getElementById('modelo').value.trim();
            const tipo = document.getElementById('productType').value;

            if (!nome || !marca || !modelo) {
                alert('Por favor, preencha todos os campos obrigatórios');
                return false;
            }

            if (tipo === 'ferramenta') {
                const tipoProduto = document.getElementById('tipo').value.trim();
                if (!tipoProduto) {
                    alert('Por favor, informe o tipo da ferramenta');
                    return false;
                }
            }

            return true;
        }

        function editarProduto(id) {
            produtoEditando = produtos.find(p => p.id === id);
            if (!produtoEditando) return;

            editando = true;
            document.getElementById('form-title').textContent = 'Editar Produto';
            document.getElementById('submit-btn').textContent = 'Atualizar Produto';
            document.getElementById('cancel-btn').style.display = 'block';

            // Selecionar tipo
            document.querySelectorAll('.type-option').forEach(opt => opt.classList.remove('selected'));
            document.querySelector(`[data-type="${produtoEditando.tipo}"]`).classList.add('selected');
            document.getElementById('productType').value = produtoEditando.tipo;
            toggleCamposEspecificos();

            // Preencher campos
            document.getElementById('productId').value = produtoEditando.id;
            document.getElementById('nome').value = produtoEditando.nome;
            document.getElementById('marca').value = produtoEditando.marca;
            document.getElementById('modelo').value = produtoEditando.modelo;

            if (produtoEditando.tipo === 'ferramenta') {
                document.getElementById('tipo').value = produtoEditando.tipo_produto;
                document.getElementById('descricao').value = produtoEditando.descricao || '';
            }
        }

        function cancelarEdicao() {
            editando = false;
            produtoEditando = null;
            limparFormulario();
            document.getElementById('form-title').textContent = 'Cadastrar Novo Produto';
            document.getElementById('submit-btn').textContent = 'Cadastrar Produto';
            document.getElementById('cancel-btn').style.display = 'none';
        }

        async function excluirProduto(id) {
            if (!confirm('Tem certeza que deseja excluir este produto?')) {
                return;
            }

            try {
                produtos = produtos.filter(p => p.id !== id);
                atualizarTabela();
                alert('Produto excluído com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir produto:', error);
                alert('Erro ao excluir produto');
            }
        }

        function limparFormulario() {
            document.getElementById('productForm').reset();
            document.getElementById('productId').value = '';
            document.querySelectorAll('.type-option').forEach(opt => opt.classList.remove('selected'));
            document.querySelector('[data-type="ferramenta"]').classList.add('selected');
            document.getElementById('productType').value = 'ferramenta';
            toggleCamposEspecificos();
        }

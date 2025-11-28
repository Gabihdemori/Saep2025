# Requisitos Funcionais
A seguir segue a lista de requisitos funcionais do sistema:
- [RF01] Interface de autenticação
    - [RF01.1] Solicitar email e senha
    - [RF01.2] Validar as credenciais do usuário
    - [RF01.3] Redirecionar para a interface principal após login bem-sucedido
- [RF02] Interface principal do sistema
    - [RF02.1] Exibir nome do usuário logado
    - [RF02.2] Desenvolver meio para o usuário fazer logout
    - [RF02.3] Redirecionar para tela de login após logout
    - [RF02.4] Desenvolver meio de acessar a interface "Cadastro de Produto"
    - [RF02.5] Desenvolver meio de acessar a interface "Gestão de Estoque"
- [RF03] Gerenciamento de Produtos (Cadastro)
    - [RF03.1] Listar produtos cadastrados (ferramentas e equipamentos) em tabela
    - [RF03.2] Carregar dados automaticamente ao acessar a interface
    - [RF03.3] Implementar campo de busca para filtrar produtos por termo
    - [RF03.4] Atualizar listagem automaticamente após busca
    - [RF03.5] Permitir cadastrar novos produtos (ferramentas e equipamentos)
    - [RF03.6] Permitir editar produtos existentes no banco de dados
    - [RF03.7] Permitir excluir produtos existentes no banco de dados
    - [RF03.8] Realizar validações dos dados inseridos nos campos
    - [RF03.9] Exibir alertas para dados ausentes ou inválidos
    - [RF03.10] Desenvolver meio para retornar à interface principal
- [RF04] Gerenciamento de Estoque
    - [RF04.1] Listar produtos cadastrados em ordem alfabética
    - [RF04.2] Implementar algoritmo de ordenação (Bubble Sort) para ordenação alfabética
    - [RF04.3] Permitir selecionar produto para movimentação de estoque
    - [RF04.4] Habilitar escolha do tipo de movimentação ("entrada" ou "saída")
    - [RF04.5] Permitir inserir data da movimentação
    - [RF04.6] Implementar verificação automática para movimentações de saída
    - [RF04.7] Gerar alerta em caso de estoque abaixo do mínimo configurado
    - [RF04.8] Atualizar estoque no banco de dados após movimentação- 
- [RF05] Gestão de Ferramentas
    - [RF05.1] Cadastrar ferramentas com os campos: nome, marca, modelo, tipo, peso, voltagem, descrição
    - [RF05.2] Listar todas as ferramentas cadastradas
    - [RF05.3] Editar informações de ferramentas existentes
    - [RF05.4] Excluir ferramentas do sistema
    - [RF05.5] Buscar ferramentas por nome, marca ou modelo
- [RF06] Gestão de Equipamentos Manuais
    - [RF06.1] Cadastrar equipamentos com os campos: nome, marca, modelo
    - [RF06.2] Listar todos os equipamentos cadastrados
    - [RF06.3] Editar informações de equipamentos existentes
    - [RF06.4] Excluir equipamentos do sistema
    - [RF06.5] Buscar equipamentos por nome, marca ou modelo
- [RF07] Gestão de Vendas
    - [RF07.1] Registrar vendas de produtos (ferramentas ou equipamentos)
    - [RF07.2] Associar vendas ao usuário responsável
    - [RF07.3] Controlar quantidade e valor total da venda
    - [RF07.4] Registrar data automática da venda
    - [RF07.5] Listar todas as vendas realizadas
    - [RF07.6] Visualizar detalhes de venda específica
    - [RF07.7] Excluir registros de venda
<<<<<<< HEAD

=======
>>>>>>> f59c443237bb4f674f35887eaba335594a4b2f2e

# SAEP - Sistema de Controle de Estoque para Ferramentas e Equipamentos Manuais

## Distribuição de pastas
```
./api - Backend (Node.js, Express.js, Prisma)
./web - Frontend (HTML, CSS, JavaScript)
./docs - Documentação e diagramas
**/README.md - Documentação do projeto
```
## Instruções para executar o projeto localmente
- 1 Clone o repositório do projeto:
```bash
git clone <URL_DO_REPOSITORIO>
```
- 2 Navegue até o diretório do backend e instale as dependências:
```bash
cd api
npm install
```
- 3 Configure o banco de dados:
  - Certifique-se de que o XAMPP está instalado e em execução.
  - Abra o XAMPP Control Panel e inicie o serviço MySQL.
  - Atualize o arquivo `.env` na pasta `api` com as credenciais do banco de dados.
  ```env
  DATABASE_URL="mysql://root@localhost:3306/saep_db"
  ```
  - Execute as migrações do Prisma para criar as tabelas no banco de dados:
  ```bash
  npx prisma migrate dev --name init
  ```
- 4 Inicie o servidor backend:
```bash
npm run dev
## ou
npm start
```
- 5 Abra o frontend:
- Navegue até a pasta `web` e abra o arquivo `index.html` em seu navegador, ou com o Live Server do VSCode.

## Entregas:
---
### [Lista de Requisitos Funcionais](./docs/Requisitos_funcionais.md)
---
### Diagrama entidade relacionamento DER

### Script de criação e população do banco de dados

---
### Interface de autenticação de usuários
---
### Interface principal do sistema
---
### Interface cadastro de produtos
---
### Interface gestão de produção
---
### Descritivo de Casos de Teste de Software
---

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
![MER x DER]([./docs/der.png](https://github.com/Gabihdemori/Saep2025/blob/b5ec90b2cd84e11b2966e1e133282daa92d9185f/docs/Diagrama.drawio.png))
### Script de criação e população do banco de dados
  - [Script de Criaçã - prisma/schema.prisma](./api/prisma/schema.prisma)
  - [Script de população - prisma/seed.js](./api/prisma/seed.js)
---
### [Interface de autenticação de usuários (login)](./docs/screenshot01.png)
---
### [Interface principal do sistema](./docs/screenshot02.png)
---
### [Interface cadastro de produtos](./docs/screenshot03.png) - [Excluir Produto](./docs/screenshot04.png)
---
### [Interface gestão de produção](./docs/screenshot05.png) [(Just in time)](./docs/screenshot06.png)
---
### [Descritivo de Casos de Teste de Software](./docs/casos_de_teste.md)
---

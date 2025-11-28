# API Just in time
API desenvolvida em Node.js com Express.js e Prisma ORM para gerenciar o backend do sistema

## Tecnologias Utilizadas
- Node.js
- Express.js
- Prisma ORM
- MySQL (XAMPP)
- JavaScript (ES6+)
- VsCode

## Passos para rodar o projeto localmente
- 1 Clone este repositório e acesse com VsCode, abra um terminal `cmd`ou `bash`, acesse a pasta `api` e instale as dependências:
```bash
cd api
npm install
```
- 2 Abra o XAMPP e inicie o servidor Apache e MySQL.
- 3 Crie um arquivo `.env` na raiz da pasta `api` e adicione a string de conexão com o banco de dados MySQL:
```js
DATABASE_URL="mysql://root@localhost:3306/preparacao_db"
```
- 4 Execute as migrações do Prisma para criar as tabelas no banco de dados
```bash
npx prisma migrate dev --name init
```
- 5 Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
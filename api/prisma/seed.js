const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.usuario.createMany({
    data: [
      { nome: "Ana Silva", email: "ana@email.com", senha: "senha123" },
      { nome: "Maria Souza", email: "maria@email.com", senha: "senha123" },
      { nome: "João Pereira", email: "joao@email.com", senha: "senha123" },
    ],
  })

 await prisma.ferramenta.createMany({
  data: [
    {
      nome: "Martelo de Unha",
      marca: "MASTER",
      modelo: "16 oz",
      tipo: "Manual",
      peso: null,
      voltagem: null,
      descricao: "Martelo com cabo tubular e perfil reto"
    },
    {
      nome: "Chave de Fenda",
      marca: "TRUPER",
      modelo: "F05",
      tipo: "Manual",
      peso: null,
      voltagem: null,
      descricao: "Chave de fenda 5mm com cabo de borracha"
    },
    {
      nome: "Alicate Universal",
      marca: "VONDER",
      modelo: "AU-200",
      tipo: "Manual",
      peso: null,
      voltagem: null,
      descricao: "Alicate universal 200mm"
    }
  ],
  skipDuplicates: false 
})


  await prisma.Equipamento_Manual.createMany({
    data: [
      { nome: "Furadeira Elétrica", marca: "BLACK+DECKER", modelo: "BD501" },
      { nome: "Parafusadeira a Bateria", marca: "DEWALT", modelo: "DCD771" },
      { nome: "Lixadeira Orbital", marca: "MAKITA", modelo: "BO5031K" },
    ],
  })

  await prisma.venda.createMany({
    data: [
      { id_usuario: 1, id_ferramenta: 1, id_equipamento: null, quantidade: 2, data_venda: new Date(), valor_total: 120.00 },
      { id_usuario: 2, id_ferramenta: null, id_equipamento: 2, quantidade: 1, data_venda: new Date(), valor_total: 450.00 },
      { id_usuario: 3, id_ferramenta: 3, id_equipamento: null, quantidade: 1, data_venda: new Date(), valor_total: 75.00 },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

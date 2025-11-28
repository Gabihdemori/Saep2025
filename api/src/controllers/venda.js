const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
  try {
    const { id_usuario, id_ferramenta, id_equipamento, quantidade, valor_total } = req.body;

    // Verifica se o usuário existe
    const usuario = await prisma.usuario.findUnique({ where: { id_usuario } });
    if (!usuario) return res.status(400).json({ error: "Usuário inválido" });

    // Verifica se a ferramenta existe (quando fornecida)
    if (id_ferramenta) {
      const ferramenta = await prisma.ferramenta.findUnique({ where: { id_ferramenta } });
      if (!ferramenta) return res.status(400).json({ error: "Ferramenta inválida" });
    }

    // Verifica se o equipamento existe (quando fornecido)
    if (id_equipamento) {
      const equipamento = await prisma.equipamento_manual.findUnique({ where: { id_equipamento } });
      if (!equipamento) return res.status(400).json({ error: "Equipamento inválido" });
    }

    const venda = await prisma.venda.create({
      data: {
        id_usuario,
        id_ferramenta: id_ferramenta || null,
        id_equipamento: id_equipamento || null,
        quantidade,
        valor_total,
        data_venda: new Date()
      }
    });

    res.status(201).json(venda);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const readAll = async (req, res) => {
  try {
    const vendas = await prisma.venda.findMany({
      include: {
        usuario: true,
        ferramenta: true,
        equipamento: true
      }
    });
    res.json(vendas);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const readOne = async (req, res) => {
  try {
    const venda = await prisma.venda.findUnique({
      where: { id_venda: Number(req.params.id) },
      include: { usuario: true, ferramenta: true, equipamento: true }
    });
    if (!venda) return res.status(404).json({ error: "Venda não encontrada" });
    res.json(venda);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const del = async (req, res) => {
  try {
    await prisma.venda.delete({ where: { id_venda: Number(req.params.id) } });
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { create, readAll, readOne, del };

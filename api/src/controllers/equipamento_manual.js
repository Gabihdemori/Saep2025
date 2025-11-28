const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
  try {
    const equipamento = await prisma.equipamento_manual.create({
      data: req.body
    });
    res.status(201).json(equipamento);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const readAll = async (req, res) => {
  try {
    const equipamentos = await prisma.equipamento_manual.findMany();
    res.json(equipamentos);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const update = async (req, res) => {
  try {
    const equipamento = await prisma.equipamento_manual.update({
      where: { id_equipamento: Number(req.params.id) },
      data: req.body
    });
    res.status(202).json(equipamento);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const del = async (req, res) => {
  try {
    await prisma.equipamento_manual.delete({
      where: { id_equipamento: Number(req.params.id) }
    });
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { create, readAll, update, del };

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
  try {
    const ferramenta = await prisma.ferramenta.create({
      data: req.body
    });
    res.status(201).json(ferramenta);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const readAll = async (req, res) => {
  try {
    const ferramentas = await prisma.ferramenta.findMany();
    res.json(ferramentas);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const update = async (req, res) => {
  try {
    const ferramenta = await prisma.ferramenta.update({
      where: { id_ferramenta: Number(req.params.id) },
      data: req.body
    });
    res.status(202).json(ferramenta);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const del = async (req, res) => {
  try {
    await prisma.ferramenta.delete({
      where: { id_ferramenta: Number(req.params.id) }
    });
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { create, readAll, update, del };

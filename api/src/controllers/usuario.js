const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
  try {
    const usuario = await prisma.usuario.create({
      data: req.body
    });
    delete usuario.senha;
    res.status(201).json(usuario);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const readAll = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id_usuario: true,
        nome: true,
        email: true
      }
    });
    res.json(usuarios);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const login = async (req, res) => {
  try {
    const usuario = await prisma.usuario.findFirst({
      where: {
        email: req.body.email,
        senha: req.body.senha
      }
    });
    if (usuario) {
      delete usuario.senha;
      res.json(usuario);
    } else {
      res.status(401).json({ error: "Email ou senha inválidos" });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const del = async (req, res) => {
  try {
    await prisma.usuario.delete({
      where: { id_usuario: Number(req.params.id) }
    });
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { create, readAll, login, del };

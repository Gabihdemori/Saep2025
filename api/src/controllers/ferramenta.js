const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { nome, marca, modelo, tipo, peso, voltagem, descricao } = req.body;
        const ferramenta = await prisma.ferramenta.create({
            data: { nome, marca, modelo, tipo, peso, voltagem, descricao }
        });
        res.status(201).json(ferramenta);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const readAll = async (req, res) => {
    try {
        const { search } = req.query;
        let where = {};
        
        if (search) {
            where = {
                OR: [
                    { nome: { contains: search } },
                    { marca: { contains: search } },
                    { modelo: { contains: search } }
                ]
            };
        }
        
        const ferramentas = await prisma.ferramenta.findMany({ where });
        res.json(ferramentas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, marca, modelo, tipo, peso, voltagem, descricao } = req.body;
        
        const ferramenta = await prisma.ferramenta.update({
            where: { id_ferramenta: parseInt(id) },
            data: { nome, marca, modelo, tipo, peso, voltagem, descricao }
        });
        
        res.json(ferramenta);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const del = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.ferramenta.delete({ where: { id_ferramenta: parseInt(id) } });
        res.json({ message: 'Ferramenta deletada com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { create, readAll, update, del };
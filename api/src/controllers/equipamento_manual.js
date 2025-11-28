const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { nome, marca, modelo } = req.body;
        const equipamento = await prisma.equipamento_Manual.create({
            data: { nome, marca, modelo }
        });
        res.status(201).json(equipamento);
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
        
        const equipamentos = await prisma.equipamento_Manual.findMany({ where });
        res.json(equipamentos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, marca, modelo } = req.body;
        
        const equipamento = await prisma.equipamento_Manual.update({
            where: { id_equipamento: parseInt(id) },
            data: { nome, marca, modelo }
        });
        
        res.json(equipamento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const del = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.equipamento_Manual.delete({ where: { id_equipamento: parseInt(id) } });
        res.json({ message: 'Equipamento deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { create, readAll, update, del };
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { quantidade, valor_total, id_usuario, id_ferramenta, id_equipamento } = req.body;
        
        const venda = await prisma.venda.create({
            data: {
                quantidade: parseInt(quantidade),
                valor_total: parseFloat(valor_total),
                id_usuario: parseInt(id_usuario),
                id_ferramenta: id_ferramenta ? parseInt(id_ferramenta) : null,
                id_equipamento: id_equipamento ? parseInt(id_equipamento) : null
            },
            include: {
                usuario: true,
                ferramenta: true,
                equipamento: true
            }
        });
        
        res.status(201).json(venda);
    } catch (error) {
        res.status(400).json({ error: error.message });
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
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const readOne = async (req, res) => {
    try {
        const { id } = req.params;
        const venda = await prisma.venda.findUnique({
            where: { id_venda: parseInt(id) },
            include: {
                usuario: true,
                ferramenta: true,
                equipamento: true
            }
        });
        
        if (!venda) {
            return res.status(404).json({ error: 'Venda não encontrada' });
        }
        
        res.json(venda);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const del = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.venda.delete({ where: { id_venda: parseInt(id) } });
        res.json({ message: 'Venda deletada com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { create, readAll, readOne, del };
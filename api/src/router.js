const express = require('express');
const router = express.Router();

const Usuario = require('./controllers/usuario.js');
const Ferramenta = require('./controllers/ferramenta');
const Equipamento = require('./controllers/equipamento_manual.js');
const Venda = require('./controllers/venda.js');


router.get('/', (req, res) => {
  res.json({ titulo: 'API em execução', version: '1.0.0' });
});
router.post('/usuarios', Usuario.create);
router.get('/usuarios', Usuario.readAll);
router.post('/login', Usuario.login);
router.delete('/usuarios/:id', Usuario.del);

router.post('/ferramentas', Ferramenta.create);
router.get('/ferramentas', Ferramenta.readAll);
router.patch('/ferramentas/:id', Ferramenta.update);
router.delete('/ferramentas/:id', Ferramenta.del);

router.post('/equipamentos', Equipamento.create);
router.get('/equipamentos', Equipamento.readAll);
router.patch('/equipamentos/:id', Equipamento.update);
router.delete('/equipamentos/:id', Equipamento.del);

router.post('/vendas', Venda.create);
router.get('/vendas', Venda.readAll);
router.get('/vendas/:id', Venda.readOne);
router.delete('/vendas/:id', Venda.del);

module.exports = router;

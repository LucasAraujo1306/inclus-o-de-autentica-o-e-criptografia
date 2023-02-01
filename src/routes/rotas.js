const express = require('express');
const { listarCarros, detalharCarro, cadastrarCarro, atualizarCarro, excluirCarro, } = require('../controllers/carros');
const { cadastrarUsuario, loginUsuario } = require('../controllers/usuarios');


const rotas = express();

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', loginUsuario)

rotas.get('/carro', listarCarros)
rotas.get('/carro/:id', detalharCarro)
rotas.post('/carro', cadastrarCarro)
rotas.put('/carro/:id', atualizarCarro)
rotas.delete('/carro/:id', excluirCarro)



module.exports = rotas;
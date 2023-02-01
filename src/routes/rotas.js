const express = require('express');
const { listarCarros, detalharCarro, cadastrarCarro, atualizarCarro, excluirCarro, } = require('../controllers/carros');
const { cadastrarUsuario, loginUsuario, obterPerfil } = require('../controllers/usuarios');
const verificarUsuarioLogado = require('../middlewares/autenticacao');


const rotas = express();

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', loginUsuario)

rotas.use(verificarUsuarioLogado)
rotas.post('/perfil', obterPerfil);

rotas.get('/carro', verificarUsuarioLogado, listarCarros)
rotas.get('/carro/:id', verificarUsuarioLogado, detalharCarro)
rotas.post('/carro', verificarUsuarioLogado, cadastrarCarro)
rotas.put('/carro/:id', verificarUsuarioLogado, atualizarCarro)
rotas.delete('/carro/:id', verificarUsuarioLogado, excluirCarro)



module.exports = rotas;
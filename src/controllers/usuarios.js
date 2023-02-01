const pool = require("../connections/pg");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaJWT = require('../senhaJWT');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const senhaCripto = await bcrypt.hash(senha, 10)

        const novoUsuario = await pool.query('insert into usuarios (nome,email,senha) values ($1,$2,$3) returning *', [nome, email, senhaCripto]);

        return res.status(201).json(novoUsuario.rows[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servido" })
    }
}

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body

    try {
        const usuario = await pool.query('select * from usuarios where email = $1', [email]);

        if (!usuario.rows) { return res.status(404).json({ mensagem: 'Email ou senha invalida' }) }

        const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha)

        if (!senhaValida) { return res.status(400).json({ mensagem: 'Email ou senha invalida' }) }

        const token = jwt.sign({ id: usuario.rows[0].id }, senhaJWT, { expiresIn: '1h' });

        const { senha: _, ...usuarioLogado } = usuario.rows[0]

        return res.json({ usuario: usuarioLogado, token });
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servido" })
    }
}

module.exports = {
    cadastrarUsuario,
    loginUsuario
}
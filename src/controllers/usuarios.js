const pool = require("../connections/pg")
const bcrypt = require('bcrypt');

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

module.exports = {
    cadastrarUsuario
}
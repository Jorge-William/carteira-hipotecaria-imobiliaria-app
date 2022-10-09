const express = require("express");

require("dotenv").config();
// const auth = require("../../middleware/auth.middleware");
const {
  login,
  create,
  logout,
} = require("../../controllers/user/user.controller");
const Usuario = require("../../models/user.model");

const router = new express.Router();

// ------------------------------------ Login ------------------------------------
router.post("/login", login, async (req, res) => {
  const {
    /* eslint-disable */
		id,
		name,
		lastName,
		token,
		type,
		usuario_id
	} = req.user
	try {
		// Por enquanto retorna todos os dados do usuario para o frontend
		res.send({
			message: 'Bem vindo ',
			id,
			name,
			lastName,
			usuario_id,
			/* eslint-enable */
      type,
      token,
      userIsValid: true,
    });
  } catch (error) {
    res.status(400).send({
      error: req.user,
      message: "Algo deu errado com o seu login.",
    });
  }
});
// -------------------------------------------------------------------------------

// --------------------------------- Logout --------------------------------------

router.post("/logout", logout, (req, res) => {
  res.send({ message: "olá mundo" });
});
// -------------------------------------------------------------------------------

// -------------------------------- Fetch usuarios -------------------------------
router.get("/usuarios", async (req, res) => {
  try {
    const Usuarios = await Usuario.findAll();

    const listaUsuarios = Usuarios.map((usuario) => usuario.dataValues);

    console.log(Usuarios);

    res.send({
      listaUsuarios,
    });
  } catch (error) {
    res.status(500).send({ message: "algo deu errado com a requisição!" });
  }
});

// -------------------------------- Delete User ----------------------------------

router.delete("/deletar-usuario/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.destroy({
      where: {
        id,
      },
    });

    res.send({ usuario });
  } catch (error) {
    res.status(500).send({
      mensagem: "Algo de errado com a operação do lado do servidor!",
    });
  }
});

// -------------------------------- Create User ----------------------------------
router.post("/criar-usuario", create, async (req, res) => {
  console.log("Testando");
  res.status(200).send({ message: "Usuário criado com sucesso!" });
});
// -------------------------------------------------------------------------------

module.exports = router;

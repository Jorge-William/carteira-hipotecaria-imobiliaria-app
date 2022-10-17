require("dotenv").config();
const express = require("express");
const Log = require("../../models/log.model");
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

    // console.log(Usuarios);

    res.send({
      listaUsuarios,
    });
  } catch (error) {
    res.status(500).send({ message: "algo deu errado com a requisição!" });
  }
});

// -------------------------------- Fetch usuarios por id -------------------------------

router.post("/usuario-modal", async (req, res) => {
  try {
    const usuario = await Usuario.findAll({
      where: {
        id: req.body.params.id,
      },
    });
    const {
      email, name, id, lastName, type,
    } = usuario[0];

    res.send({
      email,
      name,
      id,
      lastName,
      type,
    });
  } catch (error) {
    res.send(error);
  }
});

router.put("/salvar-edicao", async (req, res) => {
  console.log(req);

  const {
    email, name, id, lastName, type,
  } = req.body.novosDados;

  try {
    const usuario = await Usuario.update(
      {
        email,
        name,
        id,
        lastName,
        type,
      },
      {
        where: {
          id,
        },
      },
    );

    if (usuario) {
      await Log.create({
        // eslint-disable-next-line
				data: Date.now(),
        // eslint-disable-next-line
        usuario: usuario_id,
        tabela: "Usuarios",
        operacao: `O usuário ${name} ${lastName} de id: ${id} foi editado.`,
      });
    }

    res.send({
      usuario,
    });
  } catch (error) {
    res.send(error);
  }
});

// -------------------------------- Delete User ----------------------------------

router.post("/deletar-usuario", async (req, res) => {
  const {
    id, usuarioId, name, lastName,
  } = req.body.params;
  try {
    const usuario = await Usuario.destroy({
      where: {
        id,
      },
    });

    if (usuario) {
      await Log.create({
        // eslint-disable-next-line
				data: Date.now(),
        // eslint-disable-next-line
        usuario: `${usuarioId}`,
        tabela: "Usuarios",
        operacao: `O usuário ${name} ${lastName} de id: ${id} foi deletado.`,
      });
    }

    res.send({ usuario });
  } catch (error) {
    res.status(500).send({
      mensagem: "Algo de errado com a operação do lado do servidor!",
    });
  }
});

// -------------------------------- Create User ----------------------------------
router.post("/criar-usuario", create, async (req, res) => {
  res.status(200).send({ message: "Usuário criado com sucesso!" });
});
// -------------------------------------------------------------------------------

module.exports = router;

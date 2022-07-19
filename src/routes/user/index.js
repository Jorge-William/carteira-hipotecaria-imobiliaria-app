const express = require("express");
const auth = require("../../middleware/auth.middleware");
const {
  login,
  create,
  logout,
} = require("../../controllers/user/user.controller");

const router = new express.Router();

// ------------------------------------ Login ------------------------------------
router.post("/login", login, async (req, res) => {
  const {
/* eslint-disable */
    id, name, lastName, token, type, usuario_id,
    
  } = req.user;
  try {
    // Por enquanto retorna todos os dados do usuario para o frontend
    res.send({
      message: "Bem vindo ",
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

// -------------------------------- Create User ----------------------------------
router.post("/admin/create", auth, create, async (req, res) => {
  const { name, lastName, type } = req.user.dataValues;
  const result = { name, lastName, type };
  res.status(200).send({ message: "Usuário criado com sucesso!", result });
});
// -------------------------------------------------------------------------------

module.exports = router;

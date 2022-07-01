const express = require("express");
// const create = require("../../controllers/mutuario-lei/mutuario-lei.controller");
const { listarTodosMutuarios, exibeMutuario } = require("../../controllers/mutuario-lei/mutuario-lei.controller");

const router = new express.Router();

// ------------------------------------ Buscar ------------------------------------
router.get("/mutuariolei", listarTodosMutuarios, async (req, res) => {
  res.status(200);
});

// ------------------------------------ Motrar um mutuario  ------------------------------------
router.get("/mostrarmutuario", exibeMutuario, async (req, res) => {
  res.send({ msg: "olá mundo" });
});

// ------------------------------------ Criar  ------------------------------------
// router.post("/lei/mutuario/criar", create, async (req, res) => {
//   res.status(200).send({ message: "Mutuario adicionado com sucesso." });
// });

module.exports = router;

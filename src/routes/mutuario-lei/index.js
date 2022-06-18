const express = require("express");
// const create = require("../../controllers/mutuario-lei/mutuario-lei.controller");
const listarTodosMutuarios = require("../../controllers/mutuario-lei/mutuario-lei.controller");

const router = new express.Router();

// ------------------------------------ Buscar ------------------------------------
router.get("/lei/mutuario", listarTodosMutuarios, async (req, res) => {
  res.status(200);
});

// ------------------------------------ Criar  ------------------------------------
// router.post("/lei/mutuario/criar", create, async (req, res) => {
//   res.status(200).send({ message: "Mutuario adicionado com sucesso." });
// });

module.exports = router;

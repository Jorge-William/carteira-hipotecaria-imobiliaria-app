const express = require("express");
// const create = require("../../controllers/mutuario-lei/mutuario-lei.controller");
const {
  listarTodosMutuarios,
} = require("../../controllers/mutuario-lei/mutuario-lei.controller");
const sequelize = require("../../database/sequelize.connection");

const router = new express.Router();

// ------------------------------------ Buscar ------------------------------------
router.get("/mutuariolei", listarTodosMutuarios, async (req, res) => {
  res.status(200);
});

// ------------------------------------ Motrar um mutuario  ------------------------------------
router.post("/mutuariobyid", async (req, res) => {
  const { id } = req.body.params;

  const [result, metadata] = await sequelize.query(`SELECT a.id, rotulo, nome, end, numero, bairro, cidade,uf, hipoteca,escritura, complemento,
  telefone, dt_liq, num_obra, cod_historico, obs, cep
  FROM testdb.mutuarios_lei a
  LEFT JOIN testdb.imoveis_lei b 
  ON a.id = b.mutuario_id
  where a.id = ${id};`);

  res.status(200).send({ result });

  console.log(metadata);
});

// ------------------------------------ Criar  ------------------------------------
// router.post("/lei/mutuario/criar", create, async (req, res) => {
//   res.status(200).send({ message: "Mutuario adicionado com sucesso." });
// });

module.exports = router;

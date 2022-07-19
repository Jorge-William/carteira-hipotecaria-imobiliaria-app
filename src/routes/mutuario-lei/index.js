const express = require("express");
// const create = require("../../controllers/mutuario-lei/mutuario-lei.controller");
const { QueryTypes } = require("sequelize");
const sequelize = require("../../database/sequelize.connection");

const router = new express.Router();
const { MutuarioLei, ImoveisLei } = require("../../models/mutuario-lei.model");

// ------------------------------------ Buscar ------------------------------------
router.get("/mutuariolei", async (req, res) => {
  const result = await MutuarioLei.findAll({
    raw: false,
    include: [
      {
        model: await ImoveisLei,
        required: false,
      },
    ],
    order: [["id", "ASC"]],
  });

  res.status(200).send(result);
});

// --------------------------- Motrar um mutuario com todos os dados  ---------------------------
router.post("/alldatamutuariobyid", async (req, res) => {
  const { id } = req.body.params;

  const [result, metadata] = await sequelize.query(`SELECT a.id, rotulo, nome, end, numero, bairro, cidade, uf, hipoteca,escritura, complemento,
  telefone, dt_liq, num_obra, cod_historico, obs, cep
  FROM testdb.mutuarios_lei a
  LEFT JOIN testdb.imoveis_lei b 
  ON a.id = b.mutuario_id
  where a.id = ${id};`);

  res.status(200).send({ result });

  console.log(metadata);
});

// ------------------------------------- Mostrar mutuario simples por id ------------------------
router.post("/cabecalhodocumento", async (req, res) => {
  const { id } = req.body.params;

  const result = await sequelize.query(
    `select tipo, rotulo, nome from mutuarios_lei where id = ${id} `,
    { type: QueryTypes.SELECT },
  );
  const tipoDoc = await sequelize.query(
    "select id, abreviacao, descricao from tipos_doc_lei",
    { type: QueryTypes.SELECT },
  );

  res.status(200).send({ result, tipoDoc });
});

// ------------------------------------ Criar  ------------------------------------
// router.post("/lei/mutuario/criar", create, async (req, res) => {
//   res.status(200).send({ message: "Mutuario adicionado com sucesso." });
// });

module.exports = router;

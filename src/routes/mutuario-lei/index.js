const express = require("express");
// const create = require("../../controllers/mutuario-lei/mutuario-lei.controller");
const { QueryTypes } = require("sequelize");
const fs = require("fs/promises");
const sequelize = require("../../database/sequelize.connection");

const router = new express.Router();
const { MutuariosLei, ImoveisLei } = require("../../models/mutuario-lei.model");

// ------------------------------------ Buscar ------------------------------------
router.get("/mutuariolei", async (req, res) => {
  const result = await MutuariosLei.findAll({
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

  if (process.env.NODE_ENV === "production") {
    // PRODUÇÃO
    // eslint-disable-next-line
		const [result] = await sequelize.query(`SELECT a.id, rotulo, nome, end, numero, bairro, cidade, uf, hipoteca,escritura, complemento,
    telefone, dt_liq, num_obra, cod_historico, obs, cep
    FROM app_chi.mutuarios_lei a
    LEFT JOIN app_chi.imoveis_lei b 
    ON a.id = b.mutuario_id
    where a.id = ${id};`);
    res.status(200).send({ result });
  } else if (process.env.NODE_ENV === "development") {
    // DESENVOLVIMENTO
    // eslint-disable-next-line
    const [result] = await sequelize.query(`SELECT a.id, rotulo, nome, end, numero, bairro, cidade, uf, hipoteca,escritura, complemento,
    telefone, dt_liq, num_obra, cod_historico, obs, cep
    FROM testdb.mutuarios_lei a
    LEFT JOIN testdb.imoveis_lei b 
    ON a.id = b.mutuario_id
    where a.id = ${id};`);
    res.status(200).send({ result });
  }
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
router.post("/criar-mutuario-lei", async (req, res) => {
  // console.log(req.body);

  const {
    nome, tipo, pasta, telefone,
  } = req.body.mutuarioData;

  const {
    dataLiq,
    escritura,
    hipoteca,
    numObra,
    codHist,
    obs,
    cep,
    endereco,
    numero,
    compl,
    bairro,
    cidade,
    uf,
  } = req.body.imovelData;

  try {
    // verificar se a pasta já existe
    const buscaRotulo = await MutuariosLei.findOne({
      where: { rotulo: `${req.body.mutuarioData.pasta}` },
    });

    if (buscaRotulo) {
      // eslint-disable-next-line no-console
      console.log("PASTA JÀ EXISTE");
    } else {
      // eslint-disable-next-line no-console
      console.log("O MUTUARIO SERÁ SALVO");
    }

    // Caso a pasta ainda não exista, execute a query
    if (buscaRotulo === null) {
      const statusPasta = await fs.mkdir(
        `./pastas/lei/${pasta.toUpperCase()}`,
        { recursive: true },
      );
      const mutuario = await MutuariosLei.create({
        tipo: `${tipo}`,
        rotulo: `${pasta.toUpperCase()}`,
        nome: `${nome}`,
        telefone: `${telefone}`,
      });

      const imovel = await ImoveisLei.create({
        dt_liq: `${dataLiq}`,
        escritura,
        hipoteca: `${hipoteca}`,
        num_obra: `${numObra}`,
        cod_historico: `${codHist}`,
        obs: `${obs}`,
        cep: `${cep}`,
        end: `${endereco}`,
        numero: `${numero}`,
        complemento: `${compl}`,
        bairro: `${bairro}`,
        cidade: `${cidade}`,
        uf: `${uf}`,
        mutuario_id: `${mutuario.dataValues.id}`,
      });

      // console.log(mutuario.dataValues);
      res.send({
        mutuarioCriado: true,
        mutuario,
        imovel,
        statusPasta,
      });
    } else {
      res.send({
        mutuarioCriado: false,
      });
    }
  } catch (error) {
    res.send({ Erro: `${error}` });
  }
});

// ------------------------------------ Criar  ------------------------------------
router.get("/documentos-nao-auditados", async (req, res) => {
  // eslint-disable-next-line
  const docsNaoAuditados = await sequelize.query(`SELECT mutuarios_lei.id, mutuarios_lei.rotulo,
  mutuarios_lei.nome, COUNT(documentos_lei.status = 0)  AS nao_auditados  FROM mutuarios_lei, 
  documentos_lei WHERE documentos_lei.status != 3 AND mutuarios_lei.id = documentos_lei.mutuario_id  
  GROUP  BY mutuarios_lei.id ORDER BY id;`);

  res.status(200).send(docsNaoAuditados);
});

module.exports = router;

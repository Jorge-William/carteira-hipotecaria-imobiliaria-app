const express = require("express");
const { QueryTypes } = require("sequelize");
const fs = require("fs/promises");
const sequelize = require("../../database/sequelize.connection");

const router = new express.Router();
const { MutuariosSfh, ImoveisSfh } = require("../../models/mutuario-sfh.model");

// ------------------------------------ Buscar ------------------------------------
router.get("/mutuariosfh", async (req, res) => {
  const result = await MutuariosSfh.findAll({
    raw: false,
    include: [
      {
        model: await ImoveisSfh,
        required: false,
      },
    ],
    order: [["id", "ASC"]],
  });

  res.status(200).send(result);
});

// --------------------------- Motrar um mutuario com todos os dados  ---------------------------
router.post("/alldatamutuario-sfh-byid", async (req, res) => {
  const { id } = req.body.params;

  if (process.env.NODE_ENV === "production") {
    // PRODUÇÃO
    const [result] = await sequelize.query(`SELECT a.id, rotulo, nome, end, numero, bairro, cidade, uf, hipoteca,escritura, complemento,
    telefone, dt_liq, num_obra, cod_historico, obs, cep
    FROM app_chi.mutuarios_sfh a
    LEFT JOIN app_chi.imoveis_sfh b 
    ON a.id = b.mutuario_id
    where a.id = ${id};`);
    res.status(200).send({ result });
  } else if (process.env.NODE_ENV === "development") {
    // DESENVOLVIMENTO
    const [result] = await sequelize.query(`SELECT a.id, rotulo, nome, end, numero, bairro, cidade, uf, hipoteca,escritura, complemento,
    telefone, dt_liq, num_obra, cod_historico, obs, cep
    FROM testdb.mutuarios_sfh a
    LEFT JOIN testdb.imoveis_sfh b 
    ON a.id = b.mutuario_id
    where a.id = ${id};`);
    res.status(200).send({ result });
  }
});

// ------------------------------------- Mostrar mutuario simples por id ------------------------
router.post("/cabecalhodocumentosfh", async (req, res) => {
  const { id } = req.body.params;

  const result = await sequelize.query(
    `select tipo, rotulo, nome from mutuarios_sfh where id = ${id} `,
    { type: QueryTypes.SELECT },
  );
  const tipoDoc = await sequelize.query(
    "select id, abrev, descricao from tipos_doc_sfh",
    { type: QueryTypes.SELECT },
  );

  res.status(200).send({ result, tipoDoc });
});

// ------------------------------------ Criar  ------------------------------------
router.post("/criar-mutuario-sfh", async (req, res) => {
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
    const buscaRotulo = await MutuariosSfh.findOne({
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
        `./pastas/sfh/${pasta.toUpperCase()}`,
        { recursive: true },
      );
      const mutuario = await MutuariosSfh.create({
        tipo: `${tipo}`,
        rotulo: `${pasta.toUpperCase()}`,
        nome: `${nome}`,
        telefone: `${telefone}`,
      });

      const imovel = await ImoveisSfh.create({
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

module.exports = router;

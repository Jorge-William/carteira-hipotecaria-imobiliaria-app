const express = require("express");
const sequelize = require("sequelize");
// const sequelize = require("../../database/sequelize.connection");
const { AuditoriaLei } = require("../../models/mutuario-lei.model");
const { DocumentosLei } = require("../../models/mutuario-sfh.model");

const router = express.Router();

router.post("/audicao-lei", async (req, res) => {
  // const {
  //   // eslint-disable-next-line
  //   id_documento, cod_pasta, nome, descricao,
  // } = req.body.params.docData;

  // console.log(id_documento);
  // const { observacao } = req.body.params.observacao;

  // const checkList = req.body.params.checklist;
  //   console.log(checkList[0].status);

  // const t = await sequelize.transaction();
  // try {
  //   const audicao = await AuditoriaLei.create({
  //     // eslint-disable-next-line
  //     doc_id: `${id_documento}`,
  //     // eslint-disable-next-line
  //     cod_pasta,
  //     nome_mutuario: `${checkList[3].status}`,
  //     ordem_pag: `${checkList[4].status}`,
  //     natureza_doc: `${checkList[0].status}`,
  //     alinhamento: `${checkList[5].status}`,
  //     qtd_pag: `${checkList[2].status}`,
  //     scan_verso: `${checkList[6].status}`,
  //     obs: `${observacao}`,
  //     legibilidade: `${checkList[1].status}`,
  //     auditado_por: 123,
  //     tipo_documento: `${descricao}`,
  //   }, { transaction: t });

  // const documento = await DocumentosSfh.findByPk(id_documento);
  // documento.status = "10";
  // console.log(documento);

  // documento.save();

  // await t.commit();

  // return res.send({ mensagem: "Audição salva com sucesso!!!" });
  // } catch (Error) {
  //   await t.rollback();
  //   return res.status(500).send({ Erro: Error.errors });
  // }
});

module.exports = router;

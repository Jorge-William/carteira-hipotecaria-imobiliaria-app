const express = require("express");
const sequelize = require("../../database/sequelize.connection");
// const { DocumentoLei } = require("../../models/mutuario-lei.model");
// const create = require("../../controllers/mutuario-lei/mutuario-lei.controller");
const router = express.Router();
// const { DocumentoLei } = require("../../models/mutuario-lei.model");
// const TipoDeDocumento = require("../../models/tipos_documentos.model");

// ------------------------------------ Buscar documento por id ------------------------------------
router.post("/documentos", async (req, res) => {
  const { id } = req.body.params;

  //   const documentos = await DocumentoLei.findAll({ where: { mutuario_id: id } });
  //   res.send(documentos);

  const [results, metadata] = await sequelize.query(`select documentos_lei.id ,documentos_lei.dt_registro, documentos_lei.nome_arquivo, documentos_lei.status,
    documentos_lei.arquivo, documentos_lei.qtd_pag, documentos_lei.auditor, 
    documentos_lei.cod_pasta, tipos_doc_lei.descricao from documentos_lei inner join tipos_doc_lei
    on documentos_lei.tipo_doc_lei_id = tipos_doc_lei.id
    where documentos_lei.mutuario_id = ${id}`);

  res.send(results);
  console.log(metadata);

  //   const documentos = await DocumentoLei.findAll({
  //     raw: true,
  //     attributes,
  //     include: [{
  //       model: TipoDeDocumento,
  //       required: true,
  //       attributes: ["descricao"],
  //     }],
  //   });
});

module.exports = router;

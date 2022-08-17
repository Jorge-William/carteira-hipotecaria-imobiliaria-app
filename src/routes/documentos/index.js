const express = require("express");
const multer = require("multer");
const path = require("path");
const storage = require("../../config/multer.config");
const sequelize = require("../../database/sequelize.connection");
const { DocumentosLei } = require("../../models/mutuario-lei.model");

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

  const [results] = await sequelize.query(`select documentos_lei.id ,documentos_lei.dt_registro,
    documentos_lei.nome_arquivo, documentos_lei.status,
    documentos_lei.arquivo, documentos_lei.qtd_pag, documentos_lei.auditor, 
    documentos_lei.cod_pasta, tipos_doc_lei.descricao from documentos_lei inner join tipos_doc_lei
    on documentos_lei.tipo_doc_lei_id = tipos_doc_lei.id
    where documentos_lei.mutuario_id = ${id}`);

  res.send(results);
  // console.log(metadata);

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

const upload = multer({
  storage, // storage: storage
});
// Como está no banco => '/pastas/lei/L0980/L0980L128.pdf'
// http://localhost:5001/documentos/L8889/L888980.pdf  Url para ler um arquivo
router.use("/documentos", express.static("pastas/lei/"));

router.post("/upload", upload.array("file"), async (req, res) => {
  // console.log(req.files[0]);
  const {
    tipo, rotulo, tipoDocId, paginas, observacao, operadorId, mutuarioId,
  } = req.body;
  const dataAgora = Date.now();
  const caminho = req.files[0].path;

  // arquivo com terminação - L8889L071.pdf
  const arquivo = path.basename(caminho);
  // console.log(arquivo);

  // caminho do arquivo
  // console.log(path.dirname(caminho));

  // nome do arquivo - L8889L071
  const nomeDoArquivo = path.basename(caminho, path.extname(caminho));
  // console.log(nomeDoArquivo);

  // caminho do arquivo - /pastas/lei/L8889/L8889L071.pdf
  const caminhoDoArquivo = path.join(`/pastas/lei/${req.body.rotulo}/${arquivo}`);

  const documento = await DocumentosLei.create({
    dt_registro: dataAgora,
    tipo,
    pasta_id: null,
    mutuario_id: mutuarioId,
    tipo_doc_lei_id: tipoDocId,
    nome_arquivo: nomeDoArquivo,
    arquivo: caminhoDoArquivo,
    operador: operadorId,
    obs: observacao,
    cod_pasta: rotulo,
    qtd_pag: paginas,
    dt_auditoria: null,
  });

  // console.log(documento);

  res.send({ result: documento });
});

module.exports = router;

const express = require("express");
const multer = require("multer");
const path = require("path");
const storage = require("../../config/multerSfh.config");
const sequelize = require("../../database/sequelize.connection");
const { DocumentosSfh } = require("../../models/mutuario-sfh.model");

// const { DocumentoLei } = require("../../models/mutuario-lei.model");
// const create = require("../../controllers/mutuario-lei/mutuario-lei.controller");
const router = express.Router();
// const { DocumentoLei } = require("../../models/mutuario-lei.model");
// const TipoDeDocumento = require("../../models/tipos_documentos.model");

// ------------------------------------ Buscar documento por id ------------------------------------
router.post("/documentosSfh", async (req, res) => {
  const { id } = req.body.params;

  //   const documentos = await DocumentoLei.findAll({ where: { mutuario_id: id } });
  //   res.send(documentos);

  const [results] = await sequelize.query(`select documentos_sfh.id ,documentos_sfh.dt_registro,
    documentos_sfh.nome_arquivo, documentos_sfh.status,
    documentos_sfh.arquivo, documentos_sfh.qtd_pag, documentos_sfh.auditor, 
    documentos_sfh.cod_pasta, tipos_doc_sfh.descricao from documentos_sfh inner join tipos_doc_sfh
    on documentos_sfh.tipo_doc_id = tipos_doc_sfh.id
    where documentos_sfh.mutuario_id = ${id}`);

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
router.use("/documentos", express.static("pastas/sfh/"));

router.post("/upload-sfh", upload.array("file"), async (req, res) => {
  console.log(req.body);
  const {
    tipo, rotulo, tipoDocId, paginas, observacao, operadorId, mutuarioId,
  } = req.body;
  const dataAgora = Date.now();
  const caminho = req.files[0].path;

  // arquivo com terminação - C8889C071.pdf
  const arquivo = path.basename(caminho);
  // console.log(arquivo);

  // caminho do arquivo
  // console.log(path.dirname(caminho));

  // nome do arquivo - L8889C071
  const nomeDoArquivo = path.basename(caminho, path.extname(caminho));
  // console.log(nomeDoArquivo);

  // caminho do arquivo - /pastas/sfh/C8889/L8889L071.pdf
  const caminhoDoArquivo = path.join(`/pastas/sfh/${req.body.rotulo}/${arquivo}`);

  const documento = await DocumentosSfh.create({
    dt_registro: dataAgora,
    tipo,
    pasta_id: null,
    mutuario_id: mutuarioId,
    tipo_doc_id: tipoDocId,
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

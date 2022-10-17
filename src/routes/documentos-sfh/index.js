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
  // eslint-disable-next-line
  const [results] =	await sequelize.query(`select documentos_sfh.id ,documentos_sfh.dt_registro,
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
  const {
    tipo,
    rotulo,
    tipoDocId,
    paginas,
    observacao,
    operadorId,
    mutuarioId,
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
  const caminhoDoArquivo = path.join(
    `/pastas/sfh/${req.body.rotulo}/${arquivo}`,
  );

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

router.get("/documentos-nao-auditados-sfh", async (req, res) => {
  // eslint-disable-next-line
	const docsNaoAuditados = await sequelize.query(`SELECT mutuarios_sfh.id, mutuarios_sfh.rotulo,
  mutuarios_sfh.nome, COUNT(documentos_sfh.status = 0)  AS nao_auditados  FROM mutuarios_sfh, 
  documentos_sfh WHERE documentos_sfh.status != 3 AND documentos_sfh.status != 10 AND mutuarios_sfh.id = documentos_sfh.mutuario_id  
  GROUP  BY mutuarios_sfh.id, mutuarios_sfh.id, mutuarios_sfh.rotulo,
  mutuarios_sfh.nome ORDER BY id;`);

  res.status(200).send(docsNaoAuditados);
});

router.post("/doc-auditando-sfh", async (req, res) => {
  const { id } = req.body.params;

  const [result] = await sequelize.query(`SELECT dt_registro, nome_arquivo, arquivo, cod_pasta, qtd_pag, descricao, nome, mutuario_id, a.id as id_documento
  FROM documentos_sfh a 
  LEFT JOIN tipos_doc_sfh b ON a.tipo_doc_id = b.id 
  LEFT JOIN mutuarios_sfh c ON a.mutuario_id = c.id  
  WHERE a.id = ${id}`);
  res.send({ result });
});

router.get("/dashboard-sfh", async (req, res) => {
  // eslint-disable-next-line
  const [naoAuditados] =		await sequelize.query(`SELECT count(status) AS naoAuditados
  FROM documentos_sfh  WHERE status = 0;`);
  // eslint-disable-next-line
  const [auditados] =		await sequelize.query(`SELECT  COUNT(status) AS auditados
  FROM documentos_sfh
  WHERE status = 3`);
  // eslint-disable-next-line
  const [pendentes] =		await sequelize.query(`SELECT  COUNT(status) AS pendentes
  FROM documentos_sfh
  WHERE status != 3 AND status != 0`);

  const [total] = await sequelize.query(`SELECT  COUNT(*) AS total
  FROM documentos_sfh`);

  const [docsNaoAuditados] = naoAuditados;
  const [docsAuditados] = auditados;
  const [docPendentes] = pendentes;
  const [docTotal] = total;

  res.send({
    docsNaoAuditados,
    docsAuditados,
    docPendentes,
    docTotal,
  });
});

module.exports = router;

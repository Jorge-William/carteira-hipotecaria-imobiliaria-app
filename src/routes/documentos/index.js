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

  const [results] =		await sequelize.query(`select documentos_lei.id ,documentos_lei.dt_registro,
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

router.post("/doc-auditando", async (req, res) => {
  const { id } = req.body.params;
  const [result] =		await sequelize.query(`SELECT dt_registro, nome_arquivo, arquivo, cod_pasta, qtd_pag, descricao, nome
  FROM documentos_lei a 
  LEFT JOIN tipos_doc_lei b ON a.tipo_doc_lei_id = b.id 
  LEFT JOIN mutuarios_lei c ON a.mutuario_id = c.id  
  WHERE a.id = ${id}`);
  // console.log(result);
  res.send({ result });
});

router.get("/documentos-nao-auditados", async (req, res) => {
  // eslint-disable-next-line
	const docsNaoAuditados =
		await sequelize.query(`SELECT mutuarios_lei.id, mutuarios_lei.rotulo,
  mutuarios_lei.nome, COUNT(documentos_lei.status = 0)  AS nao_auditados  FROM mutuarios_lei, 
  documentos_lei WHERE documentos_lei.status != 3 AND mutuarios_lei.id = documentos_lei.mutuario_id  
  GROUP  BY mutuarios_lei.id, mutuarios_lei.id, mutuarios_lei.rotulo,
  mutuarios_lei.nome ORDER BY id;`);

  res.status(200).send(docsNaoAuditados);
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

  // arquivo com terminação - L8889L071.pdf
  const arquivo = path.basename(caminho);
  // console.log(arquivo);

  // caminho do arquivo
  // console.log(path.dirname(caminho));

  // nome do arquivo - L8889L071
  const nomeDoArquivo = path.basename(caminho, path.extname(caminho));
  // console.log(nomeDoArquivo);

  // caminho do arquivo - /pastas/lei/L8889/L8889L071.pdf
  const caminhoDoArquivo = path.join(
    `/pastas/lei/${req.body.rotulo}/${arquivo}`,
  );

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

router.get("/dashboard-lei", async (req, res) => {
  const [result] = await sequelize.query(`SELECT  COUNT(status) AS naoAuditados
  FROM documentos_lei 
  WHERE status = 0`);

  res.send({ result });
});

module.exports = router;

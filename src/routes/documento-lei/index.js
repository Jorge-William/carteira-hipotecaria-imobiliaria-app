const express = require("express");
const { MutuarioLei, DocumentoLei, ImoveisLei } = require("../../models/mutuario-lei.model");

const router = new express.Router();

// ------------------------------------ Buscar ------------------------------------
router.get("/lei/documento", async (req, res) => {
  res.send({ msg: "Está funcionando" });
});

// ------------------------------------ Criar  ------------------------------------
router.post("/lei/documento/criar", async (req, res) => {
//   console.log(req.body);
  const data = Date.now();
  const {
    tipo,
    pasta_id,
    tipo_doc_lei_id,
    nome_arquivo,
    arquivo,
    operador,
    status,
    obs,
    cod_pasta,
    qtd_pag,
    auditor,
    rotulo,
    nome,
    telefone,
  } = req.body;
  //   const novoMutuario = await mutuario.create({
  //     rotulo,
  //     nome,
  //     telefone,
  //   });

  const novoDocumento = await DocumentoLei.create({
    tipo,
    pasta_id,
    dt_registro: data,
    tipo_doc_lei_id,
    nome_arquivo,
    arquivo,
    operador,
    status,
    obs,
    cod_pasta,
    qtd_pag,
    dt_auditoria: data,
    auditor,
    id_Mutuario: 6,
  });

  res.status(200).send({ message: "Rota funcionando." });
});

module.exports = router;

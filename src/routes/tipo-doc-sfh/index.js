const express = require("express");

const router = express.Router();
const { TipoDeDocumentoSfh } = require("../../models/tipos_documentos.model");

router.put("/adicionar-tipo-sfh", async (req, res) => {
  const { abreviacao, descricao } = req.body;

  try {
    const result = await TipoDeDocumentoSfh.create({ tipo: "C", abrev: abreviacao, descricao });

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

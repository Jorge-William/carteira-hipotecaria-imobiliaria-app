const express = require("express");

const router = express.Router();
const { TipoDeDocumento } = require("../../models/tipos_documentos.model");
const Log = require("../../models/log.model");

router.get("/tipos-documentos-lei", async (req, res) => {
  try {
    const tiposLei = await TipoDeDocumento.findAll();
    res.status(200).send(tiposLei);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/adicionar-tipo-lei", async (req, res) => {
  const { abreviacao, descricao, usuario_id } = req.body;
  console.log(abreviacao);
  try {
    const verifyExist = await TipoDeDocumento.findOne({
      where: { abreviacao, descricao },
    });
    if (verifyExist) {
      throw new Error();
    } else {
      const result = await TipoDeDocumento.create({
        tipo: "L",
        abreviacao,
        descricao,
      });
      if (result) {
        const log = await Log.create({
          data: Date.now(),
          // eslint-disable-next-line
					usuario: usuario_id,
          tabela: "Tipo de documento",
          // eslint-disable-next-line
					operacao: `O tipo ${descricao}, abreciação: ${abreviacao}, foi criado.`
        });
        console.log(log);
      } else {
        throw new Error();
      }

      res.status(200).send({ result: true, tipo: result });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/deletar-tipo-lei", async (req, res) => {
  const { id, usuario_id, descricao } = req.body.params;
  console.log(req.body.params);
  try {
    const tipoDeleted = await TipoDeDocumento.destroy({ where: { id } });
    console.log(tipoDeleted);

    if (tipoDeleted === 1) {
      await Log.create({
        data: Date.now(),
        // eslint-disable-next-line
				usuario: usuario_id,
        tabela: "Tipo de Documento lei",
        // eslint-disable-next-line
				operacao: `O tipo ${descricao}, foi deletado.`
      });
    }

    res.status(200).send({ result: true, tipoDeleted });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.put("/editar-tipo-lei", async (req, res) => {
  const {
    id, usuario_id, descricao, abreviacao,
  } = req.body.params;
  try {
    const edited = await TipoDeDocumento.update(
      { abreviacao, descricao },
      { where: { id } },
    );

    if (edited) {
      await Log.create({
        data: Date.now(),
        // eslint-disable-next-line
				usuario: usuario_id,
        tabela: "Tipo de Documento Lei",
        // eslint-disable-next-line
				operacao: `O tipo ${descricao}, foi editado.`
      });
    }
    res.status(200).send({ result: true });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;

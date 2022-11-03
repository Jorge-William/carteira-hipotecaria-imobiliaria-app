const express = require("express");

const router = express.Router();
const { TipoDeDocumentoSfh } = require("../../models/tipos_documentos.model");
const Log = require("../../models/log.model");

router.put("/adicionar-tipo-sfh", async (req, res) => {
  const { abreviacao, descricao, usuario_id } = req.body;

  try {
    const verifyExist = await TipoDeDocumentoSfh.findOne({
      where: { abrev: abreviacao, descricao },
    });
    if (verifyExist) {
      throw new Error();
    } else {
      const result = await TipoDeDocumentoSfh.create({
        tipo: "C",
        abrev: abreviacao,
        descricao,
      });
      if (result) {
        const log = await Log.create({
          data: Date.now(),
          // eslint-disable-next-line
					usuario: usuario_id,
          tabela: "Tipo de documento",
          // eslint-disable-next-line
					operacao: `O tipo ${descricao}, foi criado.`
        });
        console.log(log);
      } else {
        throw new Error();
      }

      res.status(200).send({ result: true, tipo: result });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/deletar-tipo", async (req, res) => {
  const { id, usuario_id, descricao } = req.body.params;
  console.log(req.body.params);
  try {
    const tipoDeleted = await TipoDeDocumentoSfh.destroy({ where: { id } });
    console.log(tipoDeleted);

    if (tipoDeleted === 1) {
      await Log.create({
        data: Date.now(),
        // eslint-disable-next-line
				usuario: usuario_id,
        tabela: "Tipo de Documento",
        // eslint-disable-next-line
				operacao: `O tipo ${descricao}, foi deletado.`
      });
    }

    res.status(200).send({ result: true, tipoDeleted });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.put("/editar-tipo", async (req, res) => {
  const {
    id, usuario_id, descricao, abrev,
  } = req.body.params;
  try {
    const edited = await TipoDeDocumentoSfh.update(
      { abrev, descricao },
      { where: { id } },
    );

    if (edited) {
      await Log.create({
        data: Date.now(),
        // eslint-disable-next-line
				usuario: usuario_id,
        tabela: "Tipo de Documento",
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

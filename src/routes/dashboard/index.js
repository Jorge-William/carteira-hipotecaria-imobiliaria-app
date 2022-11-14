const express = require("express");
const { Op } = require("sequelize");
const { MutuariosLei, DocumentosLei } = require("../../models/mutuario-lei.model");
const { MutuariosSfh, DocumentosSfh } = require("../../models/mutuario-sfh.model");

const router = express.Router();
// const sequelize = require("../../database/sequelize.connection");

router.get("/info-mutuarios", async (req, res) => {
  const totalMutuariosLei = async () => {
    const { count } = await MutuariosLei.findAndCountAll({
      where: {
        id: {
          [Op.gt]: 0,
        },
      },
    });
    return count;
  };

  const totalMutuariosSfh = async () => {
    const { count } = await MutuariosSfh.findAndCountAll({
      where: {
        id: {
          [Op.gt]: 0,
        },
      },
    });
    return count;
  };

  const docsAuditadosLei = async () => {
    const { count } = await DocumentosLei.findAndCountAll({
      where: {
        status: {
          [Op.ne]: 0,
        },
      },
    });
    return count;
  };

  const docsAuditadosSfh = async () => {
    const { count } = await DocumentosSfh.findAndCountAll({
      where: {
        status: {
          [Op.ne]: 0,
        },
      },
    });
    return count;
  };

  const docsNaoAuditadosLei = async () => {
    const { count } = await DocumentosLei.findAndCountAll({
      where: {
        status: {
          [Op.eq]: 0,
        },
      },
    });
    return count;
  };

  const docsNaoAuditadosSfh = async () => {
    const { count } = await DocumentosSfh.findAndCountAll({
      where: {
        status: {
          [Op.eq]: 0,
        },
      },
    });
    return count;
  };

  const totalMutuarios = await totalMutuariosLei() + await totalMutuariosSfh();
  const totalMutLei = await totalMutuariosLei();
  const totalMutSfh = await totalMutuariosSfh();
  const docsAuditados = await docsAuditadosLei() + await docsAuditadosSfh();
  const docsNaoAuditados = await docsNaoAuditadosLei() + await docsNaoAuditadosSfh();

  res.status(200).send({
    totalMutuarios, totalMutLei, totalMutSfh, docsAuditados, docsNaoAuditados,
  });
});

module.exports = router;

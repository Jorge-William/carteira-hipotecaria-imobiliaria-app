const express = require("express");

const router = express.Router();
const sequelize = require("../../database/sequelize.connection");

router.get("/info-mutuarios", async (req, res) => {
  const [mutuariosLei, metadataLei] = await sequelize.query(
    "select count(id) as 'qtd_mutuarios_lei' from mutuarios_lei",
  );
  const [mutuariosSfh, metadataSfh] = await sequelize.query(
    "select count(id) as 'qtd_mutuarios_sfh' from mutuarios_sfh",
  );
  // const [naoAuditadosLei, metadataNaoAuditadosLei] = await sequelize.query(
  //   "select count(status) as 'nao_auditados_lei'"
  //   + "from documentos_lei"
  //   + "where status = 0; "
  //   + "select count(status) as 'nao_auditados_sfh' "
  //   + "from documentos_sfh "
  //   + "where status = 0",
  // );

  const [auditadosSfh, metadataAuditadosSfh] = await sequelize.query(
    `select count(status) as 'auditados_lei' from documentos_lei where status != ${0};`,
  );

  const [auditadosLei, metadataAuditadosLei] = await sequelize.query(
    `select count(status) as 'auditados_sfh' from documentos_sfh where status != ${0};`,
  );

  console.log(mutuariosLei);
  console.log(mutuariosSfh);
  console.log(auditadosLei);
  console.log(auditadosSfh);
  // // console.log(metadataNaoAuditadosLei);
  // console.log(metadataAuditadosSfh);

  res.status(200).send({
    metadataLei,
    metadataSfh,
    metadataAuditadosSfh,
    metadataAuditadosLei,
  });
});

module.exports = router;

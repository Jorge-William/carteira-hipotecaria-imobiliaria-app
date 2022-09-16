const express = require("express");
const sequelize = require("../../database/sequelize.connection");
// const sequelize = require("../../database/sequelize.connection");
const {
  AuditoriaSfh,
  DocumentosSfh,
} = require("../../models/mutuario-sfh.model");

const router = express.Router();

router.post("/audicao-sfh", async (req, res) => {
  const {
    // eslint-disable-next-line
		id_documento,
    cod_pasta,
    nome,
    descricao,
  } = req.body.params.docData;

  const { observacao } = req.body.params.observacao;

  const checkList = req.body.params.checklist;
  //   console.log(checkList[0].status);

  try {
    const audicao = await AuditoriaSfh.build(
      {
        // eslint-disable-next-line
				doc_id: `${id_documento}`,
        // eslint-disable-next-line
				cod_pasta,
        nome_mutuario: `${checkList[3].status}`,
        ordem_pag: `${checkList[4].status}`,
        natureza_doc: `${checkList[0].status}`,
        alinhamento: `${checkList[5].status}`,
        qtd_pag: `${checkList[2].status}`,
        scan_verso: `${checkList[6].status}`,
        obs: `${observacao}`,
        legibilidade: `${checkList[1].status}`,
        auditado_por: 123,
        tipo_documento: `${descricao}`,
      },
    );

    const documento = await DocumentosSfh.update(
      { status: "10" },
      { where: { id: id_documento } },
    );

    console.log(documento);

    if (audicao) {
      // eslint-disable-next-line
			return res.send({ mensagem: 'Audição salva com sucesso!!!' })
    }
  } catch (Error) {
    return res.status(500).send({ Erro: Error.errors });
  }
});

module.exports = router;

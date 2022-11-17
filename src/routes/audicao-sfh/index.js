const express = require("express");
const log = require("../../models/log.model");
// const sequelize = require("../../database/sequelize.connection");
const {
  AuditoriaSfh,
  DocumentosSfh,
} = require("../../models/mutuario-sfh.model");

const router = express.Router();

router.get("/tabela-operador-sfh", async (req, res) => {
  const documentosPendentes = await AuditoriaSfh.findAll();

  res.send(documentosPendentes);
});

// eslint-disable-next-line
router.post('/audicao-sfh', async (req, res) => {
  const {
    // eslint-disable-next-line
		id_documento,
    // eslint-disable-next-line
		cod_pasta,
    descricao,
  } = req.body.params.docData;
  console.log(req.body.params.docData);

  const { observacao } = req.body.params.observacao;

  const checkList = req.body.params.checklist;
  // eslint-disable-next-line
	const { usuario_id } = req.body.params

  //   console.log(checkList[0].status);

  try {
    const audicao = await AuditoriaSfh.build({
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
      // eslint-disable-next-line
			auditado_por: usuario_id,
      tipo_documento: `${descricao}`,
      dt_auditoria: Date.now(),
    });

    const checks = [
      checkList[0].status,
      checkList[1].status,
      checkList[2].status,
      checkList[3].status,
      checkList[4].status,
      checkList[5].status,
      checkList[6].status,
    ];

    const trueValue = checks.filter((item) => item === true);

    if (trueValue.length === 7) {
      // eslint-disable-next-line
      const documento = await DocumentosSfh.update(
        // Atualizar código do auditor na tabela documento após auditoria
        // eslint-disable-next-line
				{ status: '3', auditor: usuario_id, dt_auditoria: Date.now() },
        // eslint-disable-next-line
				{ where: { id: id_documento } }
      );
      await log.create({
        // eslint-disable-next-line
				data: Date.now(),
        // eslint-disable-next-line
        usuario: usuario_id,
        tabela: "Auditoria SFH",
        // eslint-disable-next-line
        operacao: `O documento ${descricao}, com ID: ${id_documento} foi auditado sem pendências.`,
      });
    } else {
      await log.create({
        // eslint-disable-next-line
				data: Date.now(),
        // eslint-disable-next-line
        usuario: usuario_id,
        tabela: "Auditoria SFH",
        // eslint-disable-next-line
        operacao: `O documento ${descricao}, com ID: ${id_documento} foi auditado com pendências para acerto.`,
      });
      const documento = await DocumentosSfh.update(
        // Atualizar código do auditor na tabela documento após auditoria
        // eslint-disable-next-line
				{ status: '10', auditor: usuario_id, dt_auditoria: Date.now() },
        // eslint-disable-next-line
				{ where: { id: id_documento } }
      );

      console.log(documento);
      if (audicao) {
        audicao.save();
        // eslint-disable-next-line
        return res.send({ mensagem: 'Audição salva com pendências!!!' })
      }
    }
    return res.send({ mensagem: "Audição salva com sucesso sem pendências!!!" });
  } catch (Error) {
    return res.status(500).send({ Erro: Error.errors });
  }
});

module.exports = router;

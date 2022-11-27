const express = require("express");
const log = require("../../models/log.model");
const sequelize = require("../../database/sequelize.connection");

// const sequelize = require("../../database/sequelize.connection");
const {
  AuditoriaLei,
  DocumentosLei,
} = require("../../models/mutuario-lei.model");

const router = express.Router();

router.get("/tabela-operador", async (req, res) => {
  const [result] = await sequelize.query(`SELECT auditoria_lei.id,
  auditoria_lei.cod_pasta,
  auditoria_lei.nome_mutuario,
  auditoria_lei.ordem_pag,
  auditoria_lei.natureza_doc,
  auditoria_lei.alinhamento,
  auditoria_lei.legibilidade,
  auditoria_lei.qtd_pag,
  auditoria_lei.scan_verso,
  auditoria_lei.obs,
  auditoria_lei.tipo_documento,
  auditoria_lei.doc_id,
  auditoria_lei.dt_auditoria,
  operadores.name
    FROM auditoria_lei
    INNER JOIN operadores ON auditoria_lei.auditado_por = operadores.id  
    ORDER BY auditoria_lei.dt_auditoria`);

  console.log(result);
  res.send(result);
});

// eslint-disable-next-line
router.post('/audicao-lei', async (req, res) => {
  const {
    // eslint-disable-next-line
		id_documento,
    // eslint-disable-next-line
		cod_pasta,
    descricao,
  } = req.body.params.docData;
  // console.log(req.body.params.docData);
  const { observacao } = req.body.params.observacao;

  const checkList = req.body.params.checklist;
  // eslint-disable-next-line
	const { usuario_id } = req.body.params

  //   console.log(checkList[0].status);

  try {
    const audicao = await AuditoriaLei.build({
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

    // console.log(audicao);
    if (trueValue.length === 7) {
      // eslint-disable-next-line
			const documento = await DocumentosLei.update(
        // Atualizar código do auditor na tabela documento após auditoria
        // eslint-disable-next-line
				{ status: '3', auditor: usuario_id, dt_auditoria: Date.now() },
        // eslint-disable-next-line
				{ where: { id: id_documento } }
      );
      await log.create({
        data: Date.now(),
        // eslint-disable-next-line
				usuario: usuario_id,
        tabela: "Auditoria Lei",
        // eslint-disable-next-line
				operacao: `O documento ${descricao}, com ID: ${id_documento} foi auditado sem pendências.`
      });
      // console.log(documento);
    } else {
      await log.create({
        // eslint-disable-next-line
				data: Date.now(),
        // eslint-disable-next-line
				usuario: usuario_id,
        tabela: "Auditoria Lei",
        // eslint-disable-next-line
        operacao: `O documento ${descricao}, com ID: ${id_documento} foi auditado com pendências para acerto.`,
      });
      // eslint-disable-next-line
			const documento = await DocumentosLei.update(
        // Atualizar código do auditor na tabela documento após auditoria
        // eslint-disable-next-line
				{ status: '10', auditor: usuario_id, dt_auditoria: Date.now() },
        // eslint-disable-next-line
				{ where: { id: id_documento } }
      );

      // console.log(documento);
      if (audicao) {
        audicao.save();
        // eslint-disable-next-line
        return res.send({ mensagem: 'Audição salva com sucesso e sem pendências!!!' })
      }
    }
    return res.send({ mensagem: "Audição salva com pendências!" });
  } catch (Error) {
    return res.status(500).send({ Erro: Error.errors });
  }
});

module.exports = router;

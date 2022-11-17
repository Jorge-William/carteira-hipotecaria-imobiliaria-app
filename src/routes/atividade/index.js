require("dotenv").config();
const express = require("express");
const sequelize = require("../../database/sequelize.connection");

const router = new express.Router();

router.get("/atividades", async (req, res) => {
  try {
    // console.log(atividades);
    const [result] = await sequelize.query(`SELECT log_acoes.id, log_acoes.data, operadores.name, log_acoes.tabela, log_acoes.operacao
    FROM log_acoes 
    INNER JOIN operadores ON log_acoes.usuario = operadores.id  
    ORDER BY log_acoes.data`);

    console.log(result);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;

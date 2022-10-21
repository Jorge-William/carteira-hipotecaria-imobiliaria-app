require("dotenv").config();
const express = require("express");
const log = require("../../models/log.model");

const router = new express.Router();

router.get("/atividades", async (req, res) => {
  const atividades = await log.findAll();
  console.log(atividades);
  res.send(atividades);
});

module.exports = router;

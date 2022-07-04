const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ errorMessage: ["Login requerido"] });
  }

  const [, token] = authorization.split(" ");
  try {
    const dados = jwt.verify(token, process.env.SECRET);
    const { id, name } = dados;
    req.id = id;
    req.id = name;
    return next();
  } catch (error) {
    return res.status(401).send({ errorMessage: ["Token expirado ou invalido"] });
  }
};

module.exports = auth;

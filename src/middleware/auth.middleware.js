const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  // console.log("oi");
  // console.log(req.body.headers.authorization.token);
  const authorization = req.body.headers.authorization.token;
  // console.log(authorization);

  if (!authorization) {
    return res.status(401).send({ errorMessage: "Login requerido" });
  }

  // const [, token] = authorization.split(" ");
  try {
    const dados = jwt.verify(authorization, process.env.SECRET);
    const { id, name } = dados;
    console.log(dados);
    req.id = id;
    req.id = name;
    return next();
  } catch (error) {
    return res.status(401).send({ errorMessage: "Token expirado ou invalido", error });
  }
};

module.exports = auth;

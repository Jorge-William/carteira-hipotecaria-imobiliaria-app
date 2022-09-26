const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const passValidation = async (req, res, next) => {
  const {
    senha,
    idUser,
  } = req.body.params;
  try {
    const usuario = await User.findByPk(idUser);

    const { password } = usuario.dataValues;

    const passwordIsValid = await bcrypt.compare(senha, password);

    if (passwordIsValid) {
      next();
    } else {
      res.status(401).send({ msg: "Senha inválida. Tente novamente." });
    }
  } catch (error) {
    res.status(500).send({ error: error.message || error.toString() });
  }
};

module.exports = passValidation;

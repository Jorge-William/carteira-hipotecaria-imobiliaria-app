const DataTypes = require("sequelize");
const sequelize = require("../database/sequelize.connection");

const TipoDeDocumento = sequelize.define("tipos_doc_lei", {
  tipo: {
    type: DataTypes.STRING,
  },
  abreviacao: {
    type: DataTypes.STRING,
  },
  descricao: {
    type: DataTypes.STRING,
  },
});

module.exports = TipoDeDocumento;

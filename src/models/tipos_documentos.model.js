const DataTypes = require("sequelize");
const sequelize = require("../database/sequelize.connection");

const TipoDeDocumento = sequelize.define(
  "tipos_doc_lei",
  {
    tipo: {
      type: DataTypes.STRING,
    },
    abreviacao: {
      type: DataTypes.STRING,
    },
    descricao: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

const TipoDeDocumentoSfh = sequelize.define(
  "tipos_doc_sfh",
  {
    tipo: {
      type: DataTypes.STRING,
    },
    abrev: {
      type: DataTypes.STRING,
    },
    descricao: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

TipoDeDocumentoSfh.sync({ alter: true });

module.exports = { TipoDeDocumento, TipoDeDocumentoSfh };

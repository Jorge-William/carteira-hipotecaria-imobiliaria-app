const DataTypes = require("sequelize");
const sequelize = require("../database/sequelize.connection");
const { MutuarioLei } = require("./mutuario-lei.model");
const { default: TipoDeDocumento } = require("./tipos_documentos.model");

const DocumentoLei = sequelize.define("documentos_lei", {
  data_registro: {
    type: DataTypes.DATE,
    notNull: false,
    notEmpty: true,
  },
  tipo: {
    type: DataTypes.STRING,
    notNull: true,
  },
  pasta_id: {
    type: DataTypes.STRING,
    notNull: false,
  },
  mutuario_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_doc_lei_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nome_arquivo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  arquivo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  operador: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
  },
  obs: {
    type: DataTypes.STRING,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

DocumentoLei.sync();

DocumentoLei.belongsTo(TipoDeDocumento, { foreignKey: "tipo_doc_lei_id", allowNull: true });
DocumentoLei.belongsTo(MutuarioLei, { foreignKey: "mutuario_id", allowNull: true });

module.exports = DocumentoLei;

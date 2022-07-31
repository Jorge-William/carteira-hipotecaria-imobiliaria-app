const DataTypes = require("sequelize");
const sequelize = require("../database/sequelize.connection");
const { MutuarioLei } = require("./mutuario-lei.model");
const { default: TipoDeDocumento } = require("./tipos_documentos.model");

const DocumentoLei = sequelize.define(
  "documentos_lei",
  {
    dt_registro: {
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
      defaultValue: 0,
    },
    obs: {
      type: DataTypes.STRING,
    },
    cod_pasta: {
      type: DataTypes.STRING,
    },
    qtd_pag: {
      type: DataTypes.INTEGER,
    },
    dt_auditoria: {
      type: DataTypes.DATE,
    },
    auditor: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

DocumentoLei.sync();

DocumentoLei.belongsTo(TipoDeDocumento, {
  foreignKey: "tipo_doc_lei_id",
  allowNull: true,
});
DocumentoLei.belongsTo(MutuarioLei, {
  foreignKey: "mutuario_id",
  allowNull: true,
});

module.exports = DocumentoLei;

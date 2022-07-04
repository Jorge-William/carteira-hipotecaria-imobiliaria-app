const DataTypes = require("sequelize");
const sequelize = require("../database/sequelize.connection");
// const ImoveisLei = require("./imovel-lei.model");

const MutuarioLei = sequelize.define("mutuarios_lei", {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo: {
    type: DataTypes.TEXT,
    defaultValue: "L",
  },
  rotulo: {
    type: DataTypes.STRING,
  },
  nome: {
    type: DataTypes.STRING,
  },
  telefone: {
    type: DataTypes.STRING,
  },

}, {
  freezeTableName: true,
  timestamps: false,
});

const DocumentoLei = sequelize.define("documentos_lei", {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  dt_registro: {
    type: DataTypes.DATE,
  },
  tipo: {
    type: DataTypes.TEXT,
  },
  pasta_id: {
    type: DataTypes.INTEGER,
  },
  tipo_doc_lei_id: {
    type: DataTypes.INTEGER,
  },
  nome_arquivo: {
    type: DataTypes.TEXT,
  },
  arquivo: {
    type: DataTypes.TEXT,
  },
  operador: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.TEXT,
  },
  obs: {
    type: DataTypes.TEXT,
  },
  cod_pasta: {
    type: DataTypes.TEXT,
  },
  qtd_pag: {
    type: DataTypes.STRING,
  },
  dt_auditoria: {
    type: DataTypes.DATE,
  },
  auditor: {
    type: DataTypes.INTEGER,
  },

}, {
  freezeTableName: true,
  timestamps: false,
});

const ImoveisLei = sequelize.define("imoveis_lei", {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  dt_liq: {
    type: DataTypes.STRING,
  },
  escritura: {
    type: DataTypes.INTEGER,
  },
  hipoteca: {
    type: DataTypes.INTEGER,
  },
  num_obra: {
    type: DataTypes.STRING,
  },
  cod_historico: {
    type: DataTypes.INTEGER,
  },
  obs: {
    type: DataTypes.STRING,
  },
  cep: {
    type: DataTypes.STRING,
  },
  end: {
    type: DataTypes.STRING,
  },
  numero: {
    type: DataTypes.STRING,
  },
  complemento: {
    type: DataTypes.STRING,
  },
  bairro: {
    type: DataTypes.STRING,
  },
  cidade: {
    type: DataTypes.STRING,
  },
  uf: {
    type: DataTypes.STRING,
  },

}, {
  freezeTableName: true,
  timestamps: false,
});

// DocumentoLei.hasOne(MutuarioLei);

MutuarioLei.hasMany(ImoveisLei, { foreignKey: "mutuario_id" });
MutuarioLei.hasMany(DocumentoLei, { foreignKey: "mutuario_id" });

sequelize.sync();

module.exports = { MutuarioLei, DocumentoLei, ImoveisLei };

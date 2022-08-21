const DataTypes = require("sequelize");
const sequelize = require("../database/sequelize.connection");
// const ImoveisLei = require("./imovel-lei.model");

const MutuariosLei = sequelize.define(
  "mutuarios_lei",
  {
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
      allowNull: false,
      unique: true,
    },
    nome: {
      type: DataTypes.STRING,
    },
    telefone: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

const DocumentosLei = sequelize.define(
  "documentos_lei",
  {
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
      defaultValue: "0",
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
      defaultValue: null,
    },
    auditor: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

const ImoveisLei = sequelize.define(
  "imoveis_lei",
  {
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
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

// DocumentoLei.hasOne(MutuarioLei);

MutuariosLei.hasMany(ImoveisLei, { foreignKey: "mutuario_id" });
MutuariosLei.hasMany(DocumentosLei, { foreignKey: "mutuario_id" });

// sequelize.sync({ alter: true });
sequelize.sync();
// DocumentosLei.sync({ force: true });

module.exports = {
  MutuariosLei,
  DocumentosLei,
  ImoveisLei,
};

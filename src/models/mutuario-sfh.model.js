const DataTypes = require("sequelize");
const sequelize = require("../database/sequelize.connection");
// const ImoveisLei = require("./imovel-lei.model");

const MutuariosSfh = sequelize.define(
  "mutuarios_sfh",
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

const DocumentosSfh = sequelize.define(
  "documentos_sfh",
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
    tipo_doc_id: {
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

const ImoveisSfh = sequelize.define(
  "imoveis_sfh",
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

const AuditoriaSfh = sequelize.define(
  "auditoria_sfh",
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    cod_pasta: {
      type: DataTypes.TEXT,
    },
    nome_mutuario: {
      type: DataTypes.STRING,
    },
    ordem_pag: {
      type: DataTypes.TEXT,
      defaultValue: "pendente",
    },
    natureza_doc: {
      type: DataTypes.TEXT,
      defaultValue: "pendente",
    },
    alinhamento: {
      type: DataTypes.TEXT,
      defaultValue: "pendente",
    },
    legibilidade: {
      type: DataTypes.TEXT,
      defaultValue: "pendente",
    },
    qtd_pag: {
      type: DataTypes.TEXT,
      defaultValue: "pendente",
    },
    scan_verso: {
      type: DataTypes.TEXT,
      defaultValue: "pendente",
    },
    obs: {
      type: DataTypes.TEXT,
      defaultValue: "-",
      allowNull: true,
    },
    auditado_por: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dt_auditoria: {
      type: DataTypes.DATE,
    },
    tipo_documento: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

// DocumentoLei.hasOne(MutuarioLei);

MutuariosSfh.hasMany(ImoveisSfh, { foreignKey: "mutuario_id" });
MutuariosSfh.hasMany(DocumentosSfh, { foreignKey: "mutuario_id" });
DocumentosSfh.hasOne(AuditoriaSfh, { foreignKey: "doc_id" });
// AuditoriaSfh.hasOne(DocumentosSfh, { foreignKey: "auditoria_id" });

// sequelize.sync({ alter: true });
// sequelize.sync();
// DocumentosSfh.sync({ force: true });
AuditoriaSfh.sync({ alter: true });

module.exports = {
  MutuariosSfh,
  DocumentosSfh,
  ImoveisSfh,
  AuditoriaSfh,
};

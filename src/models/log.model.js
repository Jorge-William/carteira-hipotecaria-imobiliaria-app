const DataTypes = require("sequelize");
const sequelize = require("../database/sequelize.connection");
// const ImoveisLei = require("./imovel-lei.model");

const Log = sequelize.define(
  "log_acoes",
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    data: {
      type: DataTypes.DATE,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tabela: {
      type: DataTypes.STRING,
    },
    operacao: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

// Log.sync({ force: true });

module.exports = Log;

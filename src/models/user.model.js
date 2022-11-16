const DataTypes = require("sequelize");
const sequelize = require("../database/sequelize.connection");

const User = sequelize.define(
  "operadores",
  {
    name: {
      type: DataTypes.STRING,
      notNull: false,
      notEmpty: true,
    },
    lastName: {
      type: DataTypes.STRING,
      notNull: true,
      notEmpty: true,
    },
    email: {
      type: DataTypes.STRING,
      notNull: false,
      notEmpty: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "operador",
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    primeiroLogin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  { indexes: [{ unique: true, fields: ["email"] }] },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

// User.sync({ alter: true });

module.exports = User;

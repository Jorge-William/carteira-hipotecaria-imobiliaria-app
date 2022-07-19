const DataTypes = require("sequelize");
const sequelize = require("../database/sequelize.connection");

const User = sequelize.define("operadores", {
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
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
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
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

User.sync();

module.exports = User;

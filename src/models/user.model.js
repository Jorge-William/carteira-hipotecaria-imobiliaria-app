const DataTypes = require("sequelize");
const sequelize = require("../database/sequelize.connection");

const User = sequelize.define("User", {
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
});

User.sync({ alter: true });

module.exports = User;

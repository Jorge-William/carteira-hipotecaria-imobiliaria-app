module.exports = {
  HOST: "localhost",
  USER: "root",
  // PRODUÇÃO
  PASSWORD: "Server@Carteira_#22",
  DB: "app_chi",
  // DESENVOLVIMENTO
  // PASSWORD: "JW2019dan132",
  // DB: "testdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

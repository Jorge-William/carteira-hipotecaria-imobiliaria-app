if (process.env.NODE_ENV === "development") {
  // DESENVOLVIMENTO
  module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "JW2019dan132",
    DB: "testdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
} else if (process.env.NODE_ENV === "production") {
  // PRODUÇÃO
  module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Server@Carteira_#22",
    DB: "app_chi",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
}

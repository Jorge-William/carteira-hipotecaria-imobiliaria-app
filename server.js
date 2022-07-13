const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./src/routes/user/index");
const mutuarioLeiRoutes = require("./src/routes/mutuario-lei/index");
const documentoLei = require("./src/routes/documento-lei/index");
const documentos = require("./src/routes/documentos/index");
const dashboard = require("./src/routes/dashboard/index");

const app = express();
require("dotenv").config();

// --------------------------------- Parsers ----------------------------------
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ----------------------------------------------------------------------------

const corsOptions = {
  origin: "http://localhost:5001/",
};

app.use(cors(corsOptions));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}

// ------------------------   Registro das rotas ------------------------------
app.use(userRoutes);
app.use(mutuarioLeiRoutes);
app.use(documentoLei);
app.use(documentos);
app.use(dashboard);
// ----------------------------------------------------------------------------

const PORT = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Sever is running on ${PORT}`));
// // eslint-disable-next-line no-console
// console.log();

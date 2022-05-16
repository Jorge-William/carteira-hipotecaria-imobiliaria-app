const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}

app.use(express.json());
app.use(cors());

app.get("/home", (req, res) => {
  res.status(200).json({
    status: true,
    data: "Backend Responded",
  });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Sever is running on ${PORT}`));

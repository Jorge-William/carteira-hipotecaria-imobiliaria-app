const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // console.log(req.body);
    callback(null, path.resolve(`./pastas/sfh/${req.body.rotulo}`));
  },

  filename: (req, file, callback) => {
    callback(null, `${req.body.rotulo}${req.body.abrevTipoDoc}.pdf`);
  },
});

module.exports = storage;

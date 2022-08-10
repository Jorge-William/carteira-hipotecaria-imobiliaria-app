const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // console.log(req.body);
    callback(null, path.resolve(`./pastas/lei/${req.body.rotulo}`));
  },

  filename: (req, file, callback) => {
    callback(null, `${req.body.rotulo}${req.body.docId}.pdf`);
  },
});

module.exports = storage;

const path = require("path");

const fs = require("fs");

const deletaArquivo = (caminho) => {
  const caminhoDoArquivo = path.resolve(`.${caminho}`);
  fs.unlink(caminhoDoArquivo, (err) => {
    if (err) {
      return console.error(err);
    }
    return console.log("arquivo deletado");
  });
};

module.exports = deletaArquivo;

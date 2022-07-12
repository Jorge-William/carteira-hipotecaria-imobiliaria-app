const { MutuarioLei, ImoveisLei } = require("../../models/mutuario-lei.model");

const listarTodosMutuarios = async (req, res, next) => {
  const result = await MutuarioLei.findAll({
    raw: false,
    include: [
      {
        model: await ImoveisLei,
        required: false,
      },
    ],
    order: [["id", "ASC"]],
  });
  res.send(result);
  next();
};

// const create = async (req, res, next) => {
//   const {
//     rotulo,
//     nome,
//     telefone,
//     dt_liq,
//     escritur,
//     hipoteca,
//     num_obra,
//     cod_historico,
//     obs,
//     cep,
//     end,
//     numero,
//     complemento,
//     bairro,
//     cidade,
//     uf,
//   } = req.body;

//   try {
//     const mutuarios = MutuarioLei.build({
//       rotulo,
//       nome,
//       telefone,
//     });
//   } catch (error) {
//     res.status(500).send({ msg: error });
//   }
// };

module.exports = { listarTodosMutuarios };

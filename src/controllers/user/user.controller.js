const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");
const process = require("process");
const { v4: uuidv4 } = require("uuid");
const User = require("../../models/user.model");
require("dotenv").config();
// const keyToken = require("../../util");

const secret = process.env.SECRET;
// eslint-disable-next-line no-console
console.log(secret);

// ------------------------------------- Create ----------------------------------

const create = async (req, res, next) => {
  const password = "12345678";
  // eslint-disable-next-line
  const usuario_id = uuidv4();

  const {
    /* eslint-disable */
		name,
		lastName,
		email,
		type
	} = req.body.params.formData

	console.log(req.body.params)

	try {
		/**
		 * O método build() do sequelize prepara a query e a salva
		 * em uma variável nâo se conectando ao banco
		 * */
		const user = User.build({
			name,
			lastName,
			email,
			password,
			usuario_id,
			type
		})

    console.log(user);
		const passwordHashed = await bcrypt.hash(user.password, 8)
		user.password = passwordHashed

		// O método save() precisa ser assíncrono pois o mesmo se comunica com o banco de dados
		await user.save()

		// Para retornar os dados através do parametro res do express exemplo: res.user = user;
		req.user = user

		// next() é chamado para que o fluxo constinue, retornando uma resposta para o router
		next()
	} catch (error) {
		res.status(500).send({
			errorMessage: error,
			message: 'Não foi possivel criar o usuário'
		})
	}
}

// ------------------------------------- Login -----------------------------------
const login = async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { email: `${req.body.email}` }
		})
		// console.log(user);
		if (user) {
			const plainText = req.body.password
			const hashed = user.dataValues.password
			const passwordIsValid = await bcrypt.compare(plainText, hashed)
			if (passwordIsValid) {
				const token = jwt.sign(
					{
						id: user.dataValues.id,
						auth: true
					},
					secret,
					{
						expiresIn: process.env.TOKEN_EXPIRATION
					}
				)
				if (token) {
					user.token = token
					user.save()
				} else {
					throw new Error()
				}
				req.user = user
				next()
			} else {
				throw new Error()
			}
		} else {
			throw new Error()
		}
	} catch (error) {
		res.status(401).send({
			message: 'Algo deu errado com o login, verifique suas credenciais.',
			userIsValid: false
		})
	}
}

// ------------------------------------ Logout --------------------------------
const logout = (req, res, next) => {
	try {
		next()
	} catch {
		res.send({})
	}
}

module.exports = { login, create, logout }

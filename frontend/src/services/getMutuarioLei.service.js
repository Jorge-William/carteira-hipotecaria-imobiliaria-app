import axios from 'axios'

const getMutuarioLei = async (nomeDoMutuario) => {
	return axios({ 
		
		url: "/mostrarmutuario", 
		method: "get",
			data: {
				mutuario: `${nomeDoMutuario}`,
				test: "eu sou uma propriedade."
			}
		})
		.then((res) => {
			// console.log(nomeDoMutuario)
			return res.data
		})
		.catch((err) => err.data)
}
export default getMutuarioLei

import axios from 'axios'

export async function getMutuariosLei() {
	return axios
		.get('/mutuariolei', { maxContentLength: 10 })
		.then((res) => res.data)
}

export default getMutuariosLei

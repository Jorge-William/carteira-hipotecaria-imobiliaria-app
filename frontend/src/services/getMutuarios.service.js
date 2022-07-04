import axios from 'axios'

export async function getMutuariosLei() {
	return axios.get('/mutuariolei').then((res) => res.data)
}

export default getMutuariosLei

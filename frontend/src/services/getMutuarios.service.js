import axios from 'axios'

export async function getMutuariosSfh() {
	return axios.get('/mutuariosfh').then((res) => res.data)
}
export async function getMutuariosLei() {
	return axios.get('/mutuariolei').then((res) => res.data)
}



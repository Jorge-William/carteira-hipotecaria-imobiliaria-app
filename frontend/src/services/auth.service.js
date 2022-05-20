/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */
import axios from 'axios'
//* * O prefixo do servidor já está configurado no package.json (proxy script) */
// Tuto bezkoder ---> const API_URL = "http://localhost:5001/";

class AuthService {
	login(email, senha) {
		return axios
			.post('/login', {
				email,
				senha
			})
			.then((response) => {
				if (response.data.accessToken) {
					localStorage.setItem('user', JSON.stringify(response.data))
				}
				return response.data
			})
	}

	logout() {
		localStorage.removeItem('user')
	}

	// register(username, email, password) {
	// 	return axios.post('/signup', {
	// 		username,
	// 		email,
	// 		password
	// 	})
	// }

	getCurrentUser() {
		return JSON.parse(localStorage.getItem('user'))
	}
}

export default new AuthService()

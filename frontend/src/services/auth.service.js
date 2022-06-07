/* eslint-disable class-methods-use-this */
/* eslint-disable no-tabs */
import axios from 'axios'
//* * O prefixo do servidor já está configurado no package.json (proxy script) */
// Tuto bezkoder --->
// const API_URL = 'http://localhost:5001'

class AuthService {
	login(email, password) {
		return axios
			.post('/login', {
				email,
				password
			})
			.then((response) => {
				console.log(response)

				if (response.data.token) {
					localStorage.setItem(
						'userData',
						JSON.stringify(response.data)
					)
				}
				return response.data
			})
			.catch((err) => err.message)
	}

	logout() {
		localStorage.removeItem('userData')
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

import axios from 'axios'
import authHeader from './auth-header'
// const API_URL = 'http://localhost:5001'

class UserService {
	getPublicContent() {
		return axios.get('/all')
	}

	getUserBoard() {
		return axios.get('/user', { headers: authHeader() })
	}

	getModeratorBoard() {
		return axios.get('/mod', { headers: authHeader() })
	}

	getAdminBoard() {
		return axios.get('/admin', { headers: authHeader() })
	}
}

export default new UserService()

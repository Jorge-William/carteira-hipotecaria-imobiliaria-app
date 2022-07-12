import axios from 'axios'

const getMutuarioById = async (id) => {
	return axios
		.post('/mutuariobyid', {
			params: {
				id
			}
		})
		.then((result) => {
			return result.data
		})
}

export default getMutuarioById

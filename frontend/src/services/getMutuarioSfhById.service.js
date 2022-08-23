import axios from 'axios'

const getMutuarioSfhById = async (id) => {
	return axios
		.post('/alldatamutuario-sfh-byid', {
			params: {
				id
			}
		})
		.then((result) => {
			console.log(result);
			return result.data
		})
}

export default getMutuarioSfhById

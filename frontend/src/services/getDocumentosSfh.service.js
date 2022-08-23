import axios from 'axios'

const getDocumentosSfh = async (id) => {
	return axios
		.post('/documentosSfh', {
			params: {
				id
			}
		})
		.then((result) => {
			return result.data
		})
}

export default getDocumentosSfh

import axios from 'axios'

const getDocumentos = async (id) => {
	return axios
		.post('/documentos', {
			params: {
				id
			}
		})
		.then((result) => {
			return result.data
		})
}


export default  getDocumentos
import axios from 'axios'

const getDocumentos = async (id, tipo) => {
	return axios
		.post('/documentos', {
			params: {
				id,
				tipo
			}
		})
		.then((result) => {
			return result.data
		})
}


export default  getDocumentos
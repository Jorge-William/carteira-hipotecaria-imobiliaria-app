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

export async function getDocsNaoAuditadosSfh() {
	return axios
		.get('/documentos-nao-auditados-sfh')
		.then((dados) => dados.data[0])
		.catch((error) => console.error(error))
}


export async function getDocAuditandoSfh(id) {
	return axios
	.post('/doc-auditando-sfh',{
		params: {
			id
		}
	}).then(result => {
		return result.data.result
	}).catch(error => console.error(error))
}

export default getDocumentosSfh

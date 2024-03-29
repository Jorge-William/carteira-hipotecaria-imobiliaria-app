import axios from 'axios'

export function getDocumentos(id) {
	return axios
		.post('/documentos', {
			params: {
				id
			}
		})
		.then(result => {
			return result.data
		})
}

export async function getDocsNaoAuditados() {
	return axios
		.get('/documentos-nao-auditados')
		.then((dados) => dados.data[0])
		.catch((error) => console.error(error))
}

export async function getDocAuditando(id) {
	return axios
	.post('/doc-auditando',{
		params: {
			id
		}
	}).then(result => {
		return result.data.result
	}).catch(error => console.error(error))
}

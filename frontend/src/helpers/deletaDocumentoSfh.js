import Swal from 'sweetalert2'
import axios from 'axios'

const deletaDocumento =  (tipoDoc, pasta, idDoc, arquivo, mutuario_id) => {
	const userInfo = JSON.parse(localStorage.getItem('userData'))
	
	const { id } = userInfo
	
	const resultadoSwal = Swal.fire({
		title: 'Atenção',
		input: 'password',
		inputAttributes: {
			autocapitalize: 'off'
		},
		icon: 'warning',
		text: `Digite a senha de usuário para confirmar a deleção do documento: ${tipoDoc}.`,
		showCancelButton: true,
		confirmButtonText: 'Confirmar',
		cancelButtonText: 'Cancelar',
		showLoaderOnConfirm: true,
		preConfirm: (senha) => {
			return axios
				.post('/deletar-documento-substituicao', {
					params: {
						tipoDoc,
						pasta,
						idDoc,
						senha,
						id,
						arquivo
					}
				})
				.then((response) => {
					// console.log(response)
					if (response.data.status) {
						// callServices()
						return response
					}
					throw new Error(response.data.status)
				})
				.catch((error) => {
					Swal.showValidationMessage(`${error.message} - Senha inválida!`)
					return false
				})
		},
		allowOutsideClick: () => !Swal.isLoading()
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire({
				icon: 'success',
				title: 'Sucesso',
				text: 'O documento foi deletado com sucesso.'
			})
			return true
		}
	})
	return resultadoSwal
}

export default deletaDocumento

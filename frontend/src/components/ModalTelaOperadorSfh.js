import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import deletaDocumento from '../helpers/deletaDocumento'
const ModalTelaOperadorSfh = (props, callback) => {
	const navigate = useNavigate()

	const [documentoInfo, setDocumentoInfo] = useState({
		infoDoc: {
			dados: {
				arquivo: '',
				cod_pasta: '',
				id: 0,
				mutuario_id: 0
			},
			tipo: ''
		}
	})

	useEffect(() => {
		setDocumentoInfo(props)
	}, [props])

	useEffect(() => {
		console.log('foi')
	}, [documentoInfo])

	// console.log(documentoInfo)

	const { tipo } = documentoInfo.infoDoc

	const alterarDoc = async () => {
		if (documentoInfo) {
			const { arquivo, cod_pasta, id, mutuario_id } =
				documentoInfo.infoDoc.dados
			const result = await deletaDocumento(
				tipo,
				cod_pasta,
				id,
				arquivo,
				mutuario_id
			)
			if (result) {
				navigate(`/mutuario/sfh/adicionardocumento/${mutuario_id}`)
			}
			callback()
		}
	}

	return documentoInfo.length === 0 ? (
		<div
			class='modal fade'
			id='modalOperadorSfh'
			tabindex='-1'
			aria-labelledby='exampleModalLabel3'
			aria-hidden='true'
		>
			<div class='modal-dialog modal-dialog-centered'>
				<div class='modal-content'>
					<div class='modal-header'>
						<h1 class='modal-title fs-5' id='exampleModalLabel3'>
							Modal title
						</h1>
						<button
							type='button'
							class='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</div>
					<div class='modal-body'>
						<p>Nada por aqui</p>
					</div>
					<div class='modal-footer'>
						<button
							type='button'
							class='btn btn-outline-secondary'
							data-bs-dismiss='modal'
						>
							Cancelar
						</button>
						<button type='button' class='btn btn-outline-primary'>
							Salvar alterações
						</button>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div
			class='modal fade'
			id='modalOperadorSfh'
			tabindex='-1'
			aria-labelledby='exampleModalLabel2'
			aria-hidden='true'
		>
			<div class='modal-dialog modal-dialog-centered'>
				<div class='modal-content'>
					<div class='modal-header'>
						<h1
							class='modal-title fs-5'
							id='exampleModalLabel2'
							style={{ color: 'red' }}
						>
							Atenção
						</h1>
						<button
							type='button'
							class='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</div>
					<div class='modal-body'>
						<h4>Deseja substituir o documento?</h4>
					</div>
					<div class='modal-footer'>
						<button
							type='button'
							class='btn btn-outline-secondary'
							data-bs-dismiss='modal'
						>
							Cancelar
						</button>

						<button
							type='button'
							class='btn btn-outline-primary'
							onClick={() => alterarDoc()}
							data-bs-dismiss='modal'
						>
							Substituir o documento
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
export default ModalTelaOperadorSfh

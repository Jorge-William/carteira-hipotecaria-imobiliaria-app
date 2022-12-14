import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import deletaDocumento from '../helpers/deletaDocumento'
const ModalTelaOperador = (props, callback) => {
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
				navigate(`/mutuario/lei/adicionardocumento/${mutuario_id}`)
			}
			callback()
		}
	}

	return documentoInfo.length === 0 ? (
		<div
			className='modal fade'
			id='modalOperador'
			tabIndex='-2'
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'
		>
			<div className='modal-dialog modal-dialog-centered'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h1 className='modal-title fs-5' id='exampleModalLabel'>
							Modal title
						</h1>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</div>
					<div className='modal-body'>
						<p>Nada por aqui</p>
					</div>
					<div className='modal-footer'>
						<button
							type='button'
							className='btn btn-outline-secondary'
							data-bs-dismiss='modal'
						>
							Cancelar
						</button>
						<button
							type='button'
							className='btn btn-outline-primary'
						>
							Salvar alterações
						</button>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div
			className='modal fade'
			id='modalOperador'
			tabIndex='-1'
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'
		>
			<div className='modal-dialog modal-dialog-centered'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h1
							className='modal-title fs-5'
							id='exampleModalLabel'
							style={{ color: 'red' }}
						>
							Atenção
						</h1>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</div>
					<div className='modal-body'>
						<h4>Deseja substituir o documento?</h4>
					</div>
					<div className='modal-footer'>
						<button
							type='button'
							className='btn btn-outline-secondary'
							data-bs-dismiss='modal'
						>
							Cancelar
						</button>

						<button
							type='button'
							className='btn btn-outline-primary'
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
export default ModalTelaOperador

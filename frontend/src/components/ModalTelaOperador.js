import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const ModalTelaOperador = (props) => {
	const [documentoInfo, setDocumentoInfo] = useState([])

	useEffect(() => {
		setDocumentoInfo(props)
	}, [props])
	// const {id }= documentoInfo.infoDoc;
	const navigate = useNavigate()

	useEffect(() => {
		console.log('foi')
	}, [documentoInfo])
	// const { docData, alinhamento, ordemPag, legibilidade, scanVerso } =
	// documentoInfo

	const alterarDoc = () => {
		navigate(
			`/mutuario/lei/substituir-documento-lei/${documentoInfo.infoDoc.mutuario_id}`
		)
	}

	return documentoInfo.length === 0 ? (
		<div
			class='modal fade'
			id='modalOperador'
			tabindex='-1'
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'
		>
			<div class='modal-dialog modal-dialog-centered'>
				<div class='modal-content'>
					<div class='modal-header'>
						<h1 class='modal-title fs-5' id='exampleModalLabel'>
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
			id='modalOperador'
			tabindex='-1'
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'
		>
			<div class='modal-dialog modal-dialog-centered'>
				<div class='modal-content'>
					<div class='modal-header'>
						<h1
							class='modal-title fs-5'
							id='exampleModalLabel'
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
export default ModalTelaOperador

import { useState, useEffect } from 'react'

const ModalTelaOperador = (props) => {
	const [documentoInfo, setDocumentoInfo] = useState([])

	useEffect(() => {
		setDocumentoInfo(props)
	}, [props])

	const validaRescan = () => {
		if (
			documentoInfo.infoDoc[1] === 'false' ||
			documentoInfo.infoDoc[2] === 'false' ||
			documentoInfo.infoDoc[3] === 'false' ||
			documentoInfo.infoDoc[4] === 'false'
		) {
			return (
				<h3>O documento deverá ser excluído e escaneado novamente.</h3>
			)
		} else {
			return (
				<section>
					<div className='row'>
						<div className='col-8'>
							<div class='mb-3'>
								<label
									for='exampleFormControlInput1'
									class='form-label'
								>
									Natureza do documento
								</label>
								<input
									type='text'
									class='form-control'
									id='exampleFormControlInput1'
									placeholder='Certidão de Casamento'
								/>
							</div>
						</div>
						<div className='col-4'>
							<div class='mb-3'>
								<label
									for='exampleFormControlInput1'
									class='form-label'
								>
									N° de Páginas
								</label>
								<input
									type='text'
									class='form-control'
									id='exampleFormControlInput1'
									placeholder='2'
								/>
							</div>
						</div>
					</div>
				</section>
			)
		}
	}
	// const { docData, alinhamento, ordemPag, legibilidade, scanVerso } =
	// documentoInfo
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
			''
			<div class='modal-dialog modal-dialog-centered'>
				<div class='modal-content'>
					<div class='modal-header'>
						<h1 class='modal-title fs-5' id='exampleModalLabel'>
							Alterar documento: {documentoInfo.infoDoc[0]}
						</h1>
						<button
							type='button'
							class='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</div>
					<div class='modal-body'>{validaRescan()}</div>
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
	)
}
export default ModalTelaOperador

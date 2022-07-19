const DialogoAddDocumento = ({ pasta }) => {
	// const { pasta } = props
	console.log(pasta)
	return (
		<>
			<div
				class='modal fade '
				id='adicionar-documento'
				tabindex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'
			>
				<div class='modal-dialog modal-dialog-centered'>
					<div class='modal-content'>
						<div class='modal-header'>
							<h3 class='modal-title' id='exampleModalLabel'>
								Atenção
							</h3>
							<button
								type='button'
								class='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div class='modal-body'>
							<p className='fs-4 '>
								Deseja adicionar o documento à pasta:{' '}
							</p>
							<span className='fs-4 text-primary'>{pasta}?</span>
						</div>
						<div class='modal-footer'>
							<button
								type='button'
								class='btn btn-secondary'
								data-bs-dismiss='modal'
							>
								Cancelar
							</button>
							<button type='button' class='btn btn-primary'>
								Salvar documento
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default DialogoAddDocumento

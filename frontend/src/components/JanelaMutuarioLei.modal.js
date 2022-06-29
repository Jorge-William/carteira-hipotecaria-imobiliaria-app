import { useEffect } from 'react'
const JanelaMutuarioLei = () => {
	useEffect(() => {
		console.log('Estou lendo o servidor')
	}, [])

	return (
		<div
			class='modal fade'
			id='janelaMutuarioLei'
			data-bs-backdrop='static'
			data-bs-keyboard='false'
			tabindex='-1'
			aria-labelledby='staticBackdropLabel'
			aria-hidden='true'
		>
			<div class='modal-dialog modal-xl modal-dialog-centered'>
				<div class='modal-content'>
					<div class='modal-header'>
						<h2 class='modal-title' id='staticBackdropLabel'>
							Titulo do modal
						</h2>
						<button
							type='button'
							class='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</div>
					<div class='modal-body'>...</div>
					<div class='modal-footer'>
						<button
							type='button'
							class='btn btn-secondary'
							data-bs-dismiss='modal'
						>
							Fechar
						</button>
						<button type='button' class='btn btn-primary'>
							Salvar
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default JanelaMutuarioLei

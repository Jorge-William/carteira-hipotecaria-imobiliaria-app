const ExibirMutuarioLei = ({ id, dados }) => {
	// const handleClick = async (mutuario) => {
	// 	const result = await getMutuarioLei(mutuario)
	// 	return setResult(result)
	// }

	return (
		<div
			class='modal fade'
			id={id}
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
							Detalhes
						</h2>
						<button
							type='button'
							class='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</div>
					<div class='modal-body'>
						<div className='container'>
							<div className='row justify-content-center'>
								<div className='mt-3 mb-5 col-4 text-center'>
									<h3>{dados[2]}</h3>
								</div>
							</div>
							{/* <hr /> */}
							<div className='container'>
								<div className='row  justify-content-center'>
									<div className='col-8 mb-5'>
										<div className='row mt-3 mb-5'>
											<div className='col-4'>
												<strong>Pasta: </strong>
												{dados[1]}
											</div>
											<div className='col-4'>
												<strong>Telefone: </strong>
												{dados[16]}
											</div>
											<div className='col-4'>
												Tipo Lei
											</div>
										</div>
										<h4>Imóvel</h4>
										<div className='row mt-5'>
											<div className='col'>
												<strong>
													Data de liquidação:
												</strong>{' '}
												{dados[13]}
											</div>
											<div className='col'>
												<strong>
													Escritura:{' '}
													{dados[9] === 1 ? (
														<p>Sim</p>
													) : (
														<p>Não</p>
													)}
												</strong>
											</div>
											<div className='col'>
												<strong>
													Hipoteca:{' '}
													{dados[10] === 1 ? (
														<p>Sim</p>
													) : (
														<p>Não</p>
													)}
												</strong>
											</div>
										</div>
										<div className='row mt-3'>
											<div className='col'>
												<strong>
													Número da obra:{' '}
												</strong>
												{dados[15]}
											</div>
											<div className='col'>
												<strong>
													Código Histórico:{' '}
												</strong>
												{dados[14]}
											</div>
											<div className='col'>
												<strong>Observação: </strong>
												{dados[11]}
											</div>
										</div>
										<div className='row mt-3'>
											<div className='col-6'>
												<strong>Endereço:</strong>{' '}
												{dados[3]}
											</div>
											<div className='col'>
												<strong>Número:</strong>{' '}
												{dados[4]}
											</div>
											<div className='col'>
												<strong>CEP:</strong>{' '}
												{dados[12]}
											</div>
										</div>
										<div className='row mt-3'>
											<div className='col'>
												<strong>Bairro:</strong>{' '}
												{dados[6]}
											</div>
											<div className='col'>
												<strong>Comp:</strong>{' '}
												{dados[5]}
											</div>
											<div className='col'>
												<strong>Cidade: </strong>
												{dados[7]}
											</div>
											<div className='col'>
												<strong>UF: </strong>
												{dados[8]}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class='modal-footer'>
						<button type='button' class='btn btn-outline-success'>
							Documentos
						</button>

						<button
							type='button'
							class='btn btn-secondary'
							data-bs-dismiss='modal'
						>
							Fechar
						</button>
						<button type='button' class='btn btn-outline-warning'>
							Editar
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ExibirMutuarioLei

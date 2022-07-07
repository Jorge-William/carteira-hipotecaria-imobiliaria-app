import { useState } from 'react'
import getDocumentos from '../../services/getDocumentos.serice'

const ExibirMutuarioLei = ({ id, dados }) => {
	// 	const result = await getMutuarioLei(mutuario)
	// const handleClick = async (mutuario) => {
	// 	return setResult(result)
	// }
	const [documentos, setDocumentos] = useState([])

	const handleClick = async () => {
		// Posição 0 é o id do mutuário e a posição 17 é o tipo(L ou C)
		const result = await getDocumentos(dados[0], dados[17])

		setDocumentos(result)
	}

	const renderSwitch = (status) => {
		switch (status) {
			case '0':
				return (
					<p className='ms-2' style={{ color: 'orange' }}>
						<i
							class='bi bi-exclamation-triangle-fill'
							style={{ fontSize: 28 }}
						></i>
					</p>
				)
			case '1':
				return <p style={{ color: 'grey' }}>Não auditado</p>
			case '3':
				return (
					<p className='ms-2' style={{ color: 'green' }}>
						<i
							class='bi bi-patch-check-fill'
							style={{ fontSize: 28 }}
						></i>
					</p>
				)
			default:
		}
	}

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
							<div class='collapse' id='collapseExample'>
								<div class='card card-body container-documentos'>
									{/* ---------------------------- Accordion Container ---------------------------- */}

									<div
										class='accordion accordion-flush'
										id='accordionFlushExample'
									>
										{/* ---------------------------- Accordion Container FIM ---------------------------- */}

										{documentos.map((item, key) => {
											return (
												<div
													key={key}
													class='accordion-item'
												>
													<h2
														class='accordion-header'
														id='flush-headingOne'
													>
														<button
															class='accordion-button collapsed'
															type='button'
															data-bs-toggle='collapse'
															data-bs-target={`#chave${key}`}
															aria-expanded='false'
															aria-controls='flush-collapseOne'
														>
															{item.descricao}
														</button>
													</h2>
													<div
														id={`chave${key}`}
														class='accordion-collapse collapse'
														aria-labelledby='flush-headingOne'
														data-bs-parent='#accordionFlushExample'
													>
														<div className='accordion-body'>
															<table
																class='table table-striped table-hover'
																key={key}
															>
																<thead>
																	<tr className='table-dark'>
																		<th scope='col'>
																			ID
																		</th>
																		<th scope='col'>
																			Nome
																			do
																			arquivo
																		</th>
																		<th scope='col'>
																			Data
																			registro
																		</th>
																		<th scope='col'>
																			Páginas
																		</th>
																		<th scope='col'>
																			Pasta
																		</th>
																		<th scope='col'>
																			auditor
																		</th>
																		<th scope='col'>
																			Status
																		</th>
																		<th scope='col'>
																			Arquivo
																		</th>
																		<th>
																			Ação
																		</th>
																	</tr>
																</thead>
																<tbody
																	style={{
																		fontSize: 18
																	}}
																>
																	<tr
																		key={
																			key
																		}
																	>
																		<th scope='row'>
																			{
																				item.id
																			}
																		</th>
																		<td>
																			{
																				item.nome_arquivo
																			}
																		</td>
																		<td>
																			{
																				item.dt_registro
																			}
																		</td>

																		<td>
																			{
																				item.qtd_pag
																			}
																		</td>
																		<td>
																			{
																				item.cod_pasta
																			}
																		</td>
																		<td>
																			{
																				item.auditor
																			}
																		</td>
																		<td>
																			{renderSwitch(
																				item.status
																			)}
																		</td>
																		<td>
																			<button className='btn btn-success btn-sm'>
																				Abrir{' '}
																				<i class='bi bi-file-earmark-text'></i>
																			</button>
																		</td>
																		<td>
																			<p className='ms-1'>
																				<button className='btn btn-danger btn-sm'>
																					<i className='bi bi-trash'></i>
																				</button>
																			</p>
																		</td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>
												</div>
											)
										})}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class='modal-footer'>
						<button
							type='button'
							class='btn btn-outline-success'
							data-bs-toggle='collapse'
							data-bs-target='#collapseExample'
							aria-expanded='false'
							aria-controls='collapseExample'
							onClick={handleClick}
						>
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

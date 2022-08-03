import renderSwitch from '../helpers/renderSwitch'
import Skeleton from 'react-loading-skeleton'

const AccordionDeDocumentos = ({ documentos }) => {
	// console.log(documentos)

	return documentos.length === 0 ? (
		<>
			<Skeleton count={5} />
			<h4>Parece que esse mutuário não possui documentos no sistema</h4>
			<Skeleton count={5} />
		</>
	) : (
		<>
			<>
				<h3 className='mt-5'>Documentos</h3>
				<hr className='mb-5' />
			</>

			<div
				className='accordion accordion-flush'
				id='accordionFlushExample'
			>
				{documentos.map((item, key) => {
					return (
						<div key={key} className='accordion-item'>
							<h2
								className='accordion-header'
								id='flush-headingOne'
							>
								<button
									className='accordion-button collapsed'
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
								className='accordion-collapse collapse'
								aria-labelledby='flush-headingOne'
								data-bs-parent='#accordionFlushExample'
							>
								<div className='accordion-body'>
									<table
										className='table table-striped table-hover'
										key={key}
									>
										<thead>
											<tr className='table-dark'>
												<th scope='col'>ID</th>
												<th scope='col'>
													Nome do arquivo
												</th>
												<th scope='col'>
													Data registro
												</th>
												<th scope='col'>Páginas</th>
												<th scope='col'>Pasta</th>
												<th scope='col'>auditor</th>
												<th scope='col'>Status</th>
												<th scope='col'>Arquivo</th>
												<th>Ação</th>
											</tr>
										</thead>
										<tbody
											style={{
												fontSize: 18
											}}
										>
											<tr key={key}>
												<th scope='row'>{item.id}</th>
												<td>{item.nome_arquivo}</td>
												<td>{item.dt_registro}</td>

												<td>{item.qtd_pag}</td>
												<td>{item.cod_pasta}</td>
												<td>{item.auditor}</td>
												<td>
													{renderSwitch(item.status)}
												</td>
												<td>
													<button className='btn btn-success btn-sm'>
														Abrir{' '}
														<i className='bi bi-file-earmark-text'></i>
													</button>
												</td>
												<td>
													<p className='ms-1'>
														<button
															className='btn btn-danger btn-sm'
															data-bs-toggle='modal'
															data-bs-target={`#documento${key}`}
														>
															<i className='bi bi-trash'></i>
														</button>
													</p>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								{/* // ------------------------------------------Modal-------------------------------------------------- */}
								<div
									className='modal fade'
									id={`documento${key}`}
									data-bs-backdrop='static'
									data-bs-keyboard='false'
									tabIndex='-1'
									aria-labelledby='staticBackdropLabel'
									aria-hidden='true'
								>
									<div className='modal-dialog modal-dialog-centered'>
										<div className='modal-content'>
											<div className='modal-header'>
												<h3
													className='modal-title text-danger'
													id='staticBackdropLabel'
												>
													Atenção!
												</h3>
												<button
													type='button'
													className='btn-close'
													data-bs-dismiss='modal'
													aria-label='Close'
												></button>
											</div>
											<div className='modal-body'>
												<h3 className='text-secondary mb-4'>
													Deseja realmente deletar o
													documento?
												</h3>
												<h4>{item.descricao}</h4>
											</div>
											<div className='modal-footer'>
												<button
													type='button'
													className='btn btn-success'
													data-bs-dismiss='modal'
												>
													Cancelar
												</button>
												<button
													type='button'
													className='btn btn-danger'
												>
													Sim deletar
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
}

export default AccordionDeDocumentos

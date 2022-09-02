import renderSwitch from '../helpers/renderSwitch'
import Skeleton from 'react-loading-skeleton'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function AccordionDeDocumentosAuditoria({ documentos }) {

	const [option, setOption] = useState('0')
	const [docsFiltrados, setDocsFiltrados] = useState([])

	useEffect(() => {
		const filtrados = documentos.filter((doc) => doc.status === option)
		setDocsFiltrados(filtrados)
	}, [option, documentos])

	return documentos.length === 0 ? (
		<>
			<Skeleton count={5} />
			<h4>Parece que esse mutuário não possui documentos no sistema</h4>
			<Skeleton count={5} />
		</>
	) : (
		<>
			<div className='row d-flex justify-content-between align-items-center mt-5 mb-5'>
				<div className='col-md-4 '>
					<h3 className=''>Documentos</h3>
				</div>
				<div className='col-md-4 '>
					<select
						className='form-select'
						aria-label='Default select example'
						onChange={(e) => setOption(e.target.value)}
					>
						<option selected value='0'>
							Status do documento
						</option>
						<option value='0'>Ainda não auditado</option>
						<option value='3'>Documentos Ok</option>
					</select>
				</div>
			</div>
			<hr className='mb-2' />

			<div
				className='accordion accordion-flush'
				id='accordionFlushExample'
			>
				{docsFiltrados.map((item, key) => {
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
												<th scope='col'>Acões</th>
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
												<div
													className='btn-group'
													role='group'
													aria-label='Basic example'
												>
													<a
														target='blank'
														href={
															process.env
																.NODE_ENV ===
															'production'
																? `http://10.100.1.156:5001/documentos/${item.cod_pasta}/${item.nome_arquivo}.pdf`
																: process.env
																		.NODE_ENV ===
																  'development'
																? `http://localhost:5001/documentos/${item.cod_pasta}/${item.nome_arquivo}.pdf`
																: 'http://localhost:3000/dashboard'
														}
													>
														<button
															type='button'
															className='btn btn-primary'
														>
															Abrir{' '}
															<i className='bi bi-file-earmark-arrow-up'></i>
														</button>
													</a>
													{item.status === '0' && (
														<Link
															to={`/auditando/${item.id}`}
														>
															<button
																type='button'
																className='btn btn-success'
															>
																Auditar{' '}
																<i className='bi bi-clipboard2-data'></i>
															</button>
														</Link>
													)}
													<button
														type='button'
														className='btn btn-danger '
														data-bs-toggle='modal'
														data-bs-target={`#documento${key}`}
													>
														Deletar{' '}
														<i className='bi bi-trash'></i>
													</button>
												</div>
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
												<h5 className='text-secondary mb-4'>
													Deseja realmente deletar o
													documento?
												</h5>
												<p>{item.descricao}</p>
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
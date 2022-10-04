import renderSwitch from '../helpers/renderSwitch'
import Skeleton from 'react-loading-skeleton'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function AccordionDeDocumentosAuditoriaSfh({ documentos }) {

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
							Documentos não auditados
						</option>
						<option value='10'>Auditados com pendências</option>
						<option value='3'>Documentos Certificados pelo auditor</option>
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
													{item.status !== '3' && item.status !== '10' && (
														<Link
															to={`/auditando-sfh/${item.id}`}
														>
															<button
																type='button'
																className='btn btn-success'
															>
																Auditar{' '}
																<i className='bi bi-clipboard2-data'></i>
															</button>
														</Link>
													) }
												</div>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
}

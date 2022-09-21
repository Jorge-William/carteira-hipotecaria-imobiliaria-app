import renderSwitch from '../helpers/renderSwitch'
import Skeleton from 'react-loading-skeleton'
import Swal from 'sweetalert2'
import axios from 'axios'

const AccordionDeDocumentos = ({ documentos }) => {

const userInfo = JSON.parse(localStorage.getItem('userData'))

const {id} = userInfo



	const handleClick = (tipoDoc, pasta, idDoc, idUser) => {
		Swal.fire({
			title: 'Atenção',
			input: 'password',
			inputAttributes: {
				autocapitalize: 'off'
			},
			icon: 'warning',
			text: `Digite a senha de usuário para confirmar a deleção do documento: ${tipoDoc}.`,
			showCancelButton: true,
			confirmButtonText: 'Confirmar',
			cancelButtonText: 'Cancelar',
			showLoaderOnConfirm: true,
			preConfirm: (senha) => {
				return axios
					.post('/deletar-documento', {
						params: {
							tipoDoc,
							pasta,
							idDoc,
							senha,
							idUser
						}
					})
					.then((response) => {
					console.log(response);
						if (response.data.status) {
							return response
						}
							throw new Error(response.data.mensagem)
					})
					.catch((error) => {
						Swal.showValidationMessage(error)
					})
			},
			allowOutsideClick: () => !Swal.isLoading()
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					icon: 'success',
					title: 'Sucesso',
					text: 'O documento foi deletado com sucesso.'
				})
			}
		})
	}

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
														<button className='btn btn-success btn-sm'>
															Abrir{' '}
															<i className='bi bi-file-earmark-text'></i>
														</button>
													</a>
												</td>
												<td>
													<p className='ms-1'>
														<button
															className='btn btn-danger btn-sm'
															data-bs-toggle='modal'
															data-bs-target={`#documento${key}`}
															onClick={() =>
																handleClick(
																	item.descricao,
																	item.cod_pasta,
																	item.id,
																	id
																)
															}
														>
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
		</>
	)
}

export default AccordionDeDocumentos

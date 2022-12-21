import renderSwitch from '../helpers/renderSwitch'
import Skeleton from 'react-loading-skeleton'
import Swal from 'sweetalert2'
import axios from 'axios'
import acertoData from '../helpers/acertoData'
import { useEffect, useState } from 'react'

const AccordionDeDocumentos = ({ documentos, callServices }) => {
	const [pendentes, setPendentes] = useState([])
	const [certificados, setCertificados] = useState([])
	const [naoAuditados, setNaoAuditados] = useState([])

	useEffect(() => {
		const docsPendentes = documentos.filter((doc) => doc.status === '10')
		setPendentes(docsPendentes)

		const naoAuditados = documentos.filter((doc) => doc.status === '0')
		setNaoAuditados(naoAuditados)

		const docsCertificados = documentos.filter((doc) => doc.status === '3')
		setCertificados(docsCertificados)
	}, [documentos])

	const userInfo = JSON.parse(localStorage.getItem('userData'))

	const { id } = userInfo

	const handleClick = (tipoDoc, pasta, idDoc, idUser, arquivo) => {
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
							idUser,
							arquivo
						}
					})
					.then((response) => {
						// console.log(response)
						if (response.data.status) {
							callServices()
							return response
						}
						throw new Error(response.data.status)
					})
					.catch((error) => {
						Swal.showValidationMessage(`${error} - Senha inválida!`)
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
			<hr className='mb-2' />
			{certificados.length === 0 ? (
				<p></p>
			) : (
				<h4 className='mt-5 text-success'>Documentos certificados</h4>
			)}
			<div
				className='accordion accordion-flush'
				id='accordionFlushExample1'
			>
				{certificados.map((item, key) => {
					return (
						<div key={key + 100} className='accordion-item'>
							<h2
								className='accordion-header'
								id='flush-headingOne2'
							>
								<button
									className='accordion-button collapsed'
									type='button'
									data-bs-toggle='collapse'
									data-bs-target={`#chave${key + 100}`}
									aria-expanded='false'
									aria-controls='flush-collapseOne2'
								>
									{item.descricao}
								</button>
							</h2>
							<div
								id={`chave${key + 100}`}
								className='accordion-collapse collapse'
								aria-labelledby='flush-headingOn2'
								data-bs-parent='#accordionFlushExample1'
							>
								<div className='accordion-body'>
									<table
										className='table table-striped table-hover'
										key={key + 100}
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
											<tr key={key + 100}>
												<th scope='row'>{item.id}</th>
												<td>{item.nome_arquivo}</td>
												<td>
													{acertoData(
														item.dt_registro
													)}
												</td>

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
															data-bs-target={`#documento${
																key + 100
															}`}
															onClick={() =>
																handleClick(
																	item.descricao,
																	item.cod_pasta,
																	item.id,
																	id,
																	item.arquivo
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
			{pendentes.length === 0 ? (
				<p></p>
			) : (
				<h4 className='mt-5 text-secondary'>Documentos pendentes</h4>
			)}
			<div
				className='accordion accordion-flush'
				id='accordionFlushExample2'
			>
				{pendentes.map((item, key) => {
					return (
						<div key={key} className='accordion-item'>
							<h2
								className='accordion-header'
								id='flush-headingOne3'
							>
								<button
									className='accordion-button collapsed'
									type='button'
									data-bs-toggle='collapse'
									data-bs-target={`#chave${key}`}
									aria-expanded='false'
									aria-controls='flush-collapseOne3'
								>
									{item.descricao}
								</button>
							</h2>
							<div
								id={`chave${key}`}
								className='accordion-collapse collapse'
								aria-labelledby='flush-heading3'
								data-bs-parent='#accordionFlushExample2'
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
												<td>
													{acertoData(
														item.dt_registro
													)}
												</td>

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
																	id,
																	item.arquivo
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
			{naoAuditados.length === 0 ? (
				<p></p>
			) : (
				<h4 className='mt-5 text-danger'>Documentos não auditados</h4>
			)}
			<div
				className='accordion accordion-flush'
				id='accordionFlushExample3'
			>
				{naoAuditados.map((item, key) => {
					return (
						<div key={key + 3} className='accordion-item'>
							<h2
								className='accordion-header'
								id='flush-headingOneA'
							>
								<button
									className='accordion-button collapsed'
									type='button'
									data-bs-toggle='collapse'
									data-bs-target={`#chave${key + 3}`}
									aria-expanded='false'
									aria-controls='flush-collapseOneA'
								>
									{item.descricao}
								</button>
							</h2>
							<div
								id={`chave${key + 3}`}
								className='accordion-collapse collapse'
								aria-labelledby='flush-headingOneA'
								data-bs-parent='#accordionFlushExample3'
							>
								<div className='accordion-body'>
									<table
										className='table table-striped table-hover'
										key={key + 3}
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
											<tr key={key + 3}>
												<th scope='row'>{item.id}</th>
												<td>{item.nome_arquivo}</td>
												<td>
													{acertoData(
														item.dt_registro
													)}
												</td>

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
															data-bs-target={`#documento${
																key + 3
															}`}
															onClick={() =>
																handleClick(
																	item.descricao,
																	item.cod_pasta,
																	item.id,
																	id,
																	item.arquivo
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

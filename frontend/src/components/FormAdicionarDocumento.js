import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import SelectInput from './SelectInput'
import { useState, useEffect, useRef } from 'react'
import Skeleton from 'react-loading-skeleton'
import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

import axios from 'axios'

const FormAdicionarDocumento = ({ dados }) => {
	/**  O hook useParams serve para sabermos o id e voltar
	 * exatamente para o mutuario que deu origem a inclusão do documento
	 */
	const { id } = useParams()
	const filesElement = useRef(null)

	// const { values } = dados

	const [mutuarioData, setMutuarioData] = useState({
		tipo: '',
		rotulo: '',
		nome: ''
	})
	const [dadosDocumento, setDadosDocumento] = useState({
		tipoDocId: ''
	})
	const [fileSelected, setFileSelected] = useState()

	const callback = (value) => {
		setDadosDocumento({ tipoDocId: value })
	}

	const handleChange = (event) => {
		const value = event.target.value
		setDadosDocumento({
			...dadosDocumento,
			[event.target.name]: value
		})
	}

	const saveDoc = () => {
		if (
			fileSelected &&
			dadosDocumento.tipoDocId !== '' &&
			dadosDocumento.paginas !== '' &&
			dadosDocumento.observacao !== ''
		) {
			Swal.fire({
				title: 'Atenção',
				text: 'Deseja salvar o documento no servidor?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				cancelButtonText: 'Cancelar',
				confirmButtonText: 'Sim, salvar!',
				showLoaderOnConfirm: true,
				preConfirm: () => {
					// const dados = {
					// 	mutuario: mutuarioData.nome,
					// 	tipo: mutuarioData.tipo,
					// 	rotulo: mutuarioData.rotulo,
					// 	docId: dadosDocumento.tipoDocId,
					// 	paginas: dadosDocumento.paginas,
					// 	observacao: dadosDocumento.observacao,
					// 	idMutuario: id
					// }
					const formData = new FormData()
					formData.append('file', fileSelected)
					formData.append('nome', mutuarioData.nome)
					formData.append('tipo', mutuarioData.tipo)
					formData.append('rotulo', mutuarioData.rotulo)
					formData.append('docId', dadosDocumento.tipoDocId)
					formData.append('paginas', dadosDocumento.paginas)
					formData.append('observacao', dadosDocumento.observacao)
					// console.log(formData.get('file'))
					axios
						.post('/upload', formData, {
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						})
						.then((response) => {
							console.log(response)
							if (response.statusText !== 'OK') {
								throw new Error(response.statusText)
							} else {
								Swal.fire({
									icon: 'success',
									title: 'Documento salvo no sistema.'
								})
							}
							return response
						})
						.catch((error) => {
							Swal.fire({
								icon: 'error',
								title: 'Documento não pode ser salvo no sistema.'
							})
							Swal.showValidationMessage(`${error}`)
						})
				},
				allowOutsideClick: () => !Swal.isLoading()
			})
		} else {
			Swal.fire({
				icon: 'warning',
				title: 'Preencha todos os dados!',
				text: 'Os campos: tipo de documento, arquivo e quantidade de páginas, devem ser preenchidos.'
			})
		}
	}

	useEffect(() => {
		const result = dados.result
		const changeState = async () => {
			await setMutuarioData(...result)
		}

		changeState()
	}, [mutuarioData, dados.result])
	// console.log(mutuarioData)

	const fileHandler = (event) => {
		setFileSelected(event.target.files[0])
	}

	// const uploadDoc = async () => {
	// 	const formData = new FormData()
	// 	formData.append('file', fileSelected)

	// 	fetch('/upload', {
	// 		method: 'POST',
	// 		body: formData
	// 	})
	// 		.then((result) => {
	// 			console.log('Success: ' + result)
	// 		})
	// 		.catch((error) => {
	// 			console.log('Error: ' + error)
	// 		})
	// }

	return (
		<section className='mt-5'>
			<form>
				<div className='col'>
					<h4>Dados da pasta</h4>
				</div>
				<hr />
				<div className='row d-flex'>
					<div className='col-md-4 col-sm-12'>
						{mutuarioData.nome === '' ? (
							<Skeleton count={1} />
						) : (
							<>
								<label for='tipo' class='form-label'>
									Tipo
								</label>
								<input
									type='text'
									class='form-control'
									id='tipo'
									value={
										mutuarioData.tipo === 'L'
											? 'Lei'
											: 'SFH'
									}
								/>
							</>
						)}
					</div>
					<div className='col-md-4 col-sm-12'>
						{mutuarioData.rotulo === '' ? (
							<Skeleton count={1} />
						) : (
							<>
								<label for='pasta' class='form-label'>
									Pasta
								</label>
								<input
									type='text'
									class='form-control'
									id='pasta'
									value={mutuarioData.rotulo}
								/>
							</>
						)}
					</div>
					<div className='col-md-4 col-sm-12'>
						{mutuarioData.nome === '' ? (
							<Skeleton count={1} />
						) : (
							<>
								<label for='mutuario' class='form-label'>
									Mutuário
								</label>
								<input
									type='text'
									class='form-control'
									id='mutuario'
									value={mutuarioData.nome}
								/>
							</>
						)}
					</div>
				</div>
				<h4 className='mt-5'>Dados do documento</h4>
				<hr />
				<div className='row mt-3 mb-5'>
					<div className='col-md-5 col-sm-12'>
						<label for='select' class='form-label'>
							Tipo do documento
						</label>
						{/* ----------------------- Select componente---------------------------- */}
						<SelectInput
							tipoDoc={dados.tipoDoc}
							callback={callback}
						/>
						{/* --------------------------------------------------------------------- */}
					</div>
					<div className='col-md-6 col-sm-12'>
						<label for='formFile' class='form-label'>
							Arquivo
						</label>
						<input
							class='form-control'
							type='file'
							ref={filesElement}
							id='formFile'
							onChange={fileHandler}
						/>
					</div>
					<div className='col-md-1 col-sm-12'>
						<label for='paginas' class='form-label'>
							Páginas
						</label>
						<input
							type='text'
							class='form-control'
							id='paginas'
							name='paginas'
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='row'>
					<div className=''>
						<label
							for='exampleFormControlTextarea1'
							class='form-label'
						>
							Observação
						</label>
						<textarea
							class='form-control'
							id='exampleFormControlTextarea1'
							rows='3'
							name='observacao'
							onChange={handleChange}
						></textarea>
					</div>
				</div>
				<div className='row mt-5'>
					<div className='col d-flex gap-2 justify-content-between'>
						<button className='btn btn-secondary mt-4'>
							<Link to={`/detalhes/${id}`}>
								<i className='bi bi-arrow-left'></i>Voltar
							</Link>
						</button>
						<button
							type='button'
							className='btn btn-success mt-4'
							data-bs-toggle='modal'
							data-bs-target='#adicionar-documento'
							onClick={saveDoc}
						>
							Salvar
						</button>
					</div>
				</div>
			</form>
		</section>
	)
}

export default FormAdicionarDocumento
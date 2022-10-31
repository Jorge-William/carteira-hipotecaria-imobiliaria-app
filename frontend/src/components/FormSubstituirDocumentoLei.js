import React from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import SelectInput from './SelectInput'
import { useState, useEffect, useRef } from 'react'
import Skeleton from 'react-loading-skeleton'
import Swal from 'sweetalert2'
// import deletaDocumento from '../helpers/deletaDocumento'
// import withReactContent from 'sweetalert2-react-content'

import axios from 'axios'

const FormSubstituirDocumentoLei = ({ dados }) => {
	/**  O hook useParams serve para sabermos o id e voltar
	 * exatamente para o mutuario que deu origem a inclusão do documento
	 */
	const { id } = useParams()
	const filesElement = useRef(null)
	// console.log(dados.tipoDoc);

	// console.log(mutuarioData)
	const arrayTipoDoc = dados.tipoDoc
	// console.log(typeof arrayTipoDoc)
	// const { values } = dados

	const [mutuarioData, setMutuarioData] = useState({
		tipo: '',
		rotulo: '',
		nome: ''
	})

	useEffect(() => {
		const result = dados.result
		const changeState = async () => {
			await setMutuarioData(...result)
		}

		changeState()
	}, [mutuarioData, dados.result])

	const [dadosDocumento, setDadosDocumento] = useState({
		tipoDocId: ''
	})
	const [fileSelected, setFileSelected] = useState()

	// Extrai o id do usuário atual
	const localStorageData = JSON.parse(localStorage.getItem('userData'))

	const { usuario_id } = localStorageData

	// const callback = (value) => {
	// 	// console.log(typeof value)
	// 	const abreviacao = arrayTipoDoc.find((item) => {
	// 		const idConvertido = item.id
	// 		// console.log(typeof item.id)
	// 		if (idConvertido.toString() === value) {
	// 			return JSON.stringify(item)
	// 		} else {
	// 			return undefined
	// 		}
	// 	})
	// 	// console.log(abreviacao)
	// 	setDadosDocumento({
	// 		...dadosDocumento,
	// 		tipoDocId: value,
	// 		abreviacao
	// 	})
	// }

	// useState(() => {
	// 	console.log(dadosDocumento);
	// }, [dadosDocumento])

	const callback = (value) => {
		console.log(value)
		const item = arrayTipoDoc.find((item) => {
			return item.descricao === value
		})

		console.log(item)
		setDadosDocumento({
			...dadosDocumento,
			tipoDocId: item.id,
			abreviacao: item.abreviacao
		})
	}

	const handleChange = (event) => {
		const value = event.target.value

		setDadosDocumento({
			...dadosDocumento,
			[event.target.name]: value
		})
	}

	const navigate = useNavigate()
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
					formData.append('nome', mutuarioData.nome)
					formData.append('tipo', mutuarioData.tipo)
					formData.append('rotulo', mutuarioData.rotulo)
					formData.append('tipoDocId', dadosDocumento.tipoDocId)
					formData.append('paginas', dadosDocumento.paginas)
					formData.append('observacao', dadosDocumento.observacao)
					formData.append('abrevTipoDoc', dadosDocumento.abreviacao)
					formData.append('operadorId', usuario_id)
					formData.append('file', fileSelected)
					formData.append('mutuarioId', id)
					// console.log(formData.get('file'))
					axios
						.post('/upload', formData, {
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						})
						.then((response) => {
							// console.log(response)
							if (response.statusText !== 'OK') {
								throw new Error(response.statusText)
							} else {
								Swal.fire({
									icon: 'success',
									title: 'Documento salvo no sistema.'
								})
							}
							return navigate(`/operador`, {
								replace: true
							})
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

	const fileHandler = (event) => {
		setFileSelected(event.target.files[0])
	}

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
								<label htmlFor='tipo' className='form-label'>
									Tipo
								</label>
								<input
									type='text'
									className='form-control'
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
								<label htmlFor='pasta' className='form-label'>
									Pasta
								</label>
								<input
									type='text'
									className='form-control'
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
								<label
									htmlFor='mutuario'
									className='form-label'
								>
									Mutuário
								</label>
								<input
									type='text'
									className='form-control'
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
						<label htmlFor='select' className='form-label'>
							Tipo do documento
						</label>
						{/* ----------------------- Select componente---------------------------- */}
						<SelectInput
							tipoDoc={dados.tipoDoc}
							callback={callback}
						/>
						{/* --------------------------------------------------------------------- */}
					</div>
					<div className='col-md-1'>
						<label htmlFor='Código' className='form-label'>
							Código
						</label>

						<h3 className='text-secondary border  ps-1'>
							{dadosDocumento.abreviacao}
						</h3>
					</div>
					<div className='col-md-5 col-sm-12'>
						<label htmlFor='formFile' className='form-label'>
							Arquivo
						</label>
						<input
							className='form-control'
							type='file'
							ref={filesElement}
							id='formFile'
							onChange={fileHandler}
						/>
					</div>
					<div className='col-md-1 col-sm-12'>
						<label htmlFor='paginas' className='form-label'>
							Páginas
						</label>
						<input
							type='text'
							className='form-control'
							id='paginas'
							name='paginas'
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='row'>
					<div className=''>
						<label htmlFor='Observação' className='form-label'>
							Observação
						</label>
						<textarea
							className='form-control'
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
							<Link to={`/operador`}>
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

export default FormSubstituirDocumentoLei

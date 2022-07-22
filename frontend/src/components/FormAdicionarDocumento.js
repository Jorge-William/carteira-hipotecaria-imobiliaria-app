import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import SelectInput from './SelectInput'
import { useState, useEffect, useRef } from 'react'
import Skeleton from 'react-loading-skeleton'
import DialogoAddDocumento from './modal/DialogoAddDocumento.js'
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
	const [load, setLoad] = useState(false)

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

	const uploadDoc = async () => {
		const formData = new FormData()
		formData.append('file', fileSelected)
		setLoad(true)

		fetch('/upload', {
			method: 'POST',
			body: formData
		})
			.then((result) => {
				console.log('Success: ' + result)
				setLoad(false)
			})
			.catch((error) => {
				console.log('Error: ' + error)
			})
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
						>
							Salvar
						</button>
						<DialogoAddDocumento
							pasta={mutuarioData.rotulo}
							uploadDoc={uploadDoc}
							load={load}
						/>
					</div>
				</div>
			</form>
		</section>
	)
}

export default FormAdicionarDocumento

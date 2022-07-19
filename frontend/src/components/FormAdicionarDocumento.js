import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import SelectInput from './SelectInput'
import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import DialogoAddDocumento from './modal/DialogoAddDocumento.js'

const FormAdicionarDocumento = ({ dados }) => {
	/**  O hook useParams serve para sabermos o id e voltar
	 * exatamente para o mutuario que deu origem a inclusão do documento
	 */
	const { id } = useParams()

	// const { values } = dados

	const [mutuarioData, setMutuarioData] = useState({
		tipo: '',
		rotulo: '',
		nome: ''
	})
	// console.log(dados.tipoDoc)
	// console.log(mutuarioData)

	useEffect(() => {
		const result = dados.result
		const changeState = async () => {
			await setMutuarioData(...result)
		}

		changeState()
	}, [mutuarioData, dados.result])
	// console.log(mutuarioData)

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
						<SelectInput tipoDoc={dados.tipoDoc} />
						{/* --------------------------------------------------------------------- */}
					</div>
					<div className='col-md-6 col-sm-12'>
						<label for='formFile' class='form-label'>
							Arquivo
						</label>
						<input class='form-control' type='file' id='formFile' />
					</div>
					<div className='col-md-1 col-sm-12'>
						<label for='paginas' class='form-label'>
							Páginas
						</label>
						<input type='text' class='form-control' id='paginas' />
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
					</div>
					<DialogoAddDocumento pasta={mutuarioData.rotulo} />
				</div>
			</form>
		</section>
	)
}

export default FormAdicionarDocumento

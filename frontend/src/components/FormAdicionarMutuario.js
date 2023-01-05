import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import InputMask from 'react-input-mask'
import 'animate.css'

const FormAdicionarMutuario = () => {
	const navigate = useNavigate()
	const [mutuarioData, setMutuarioData] = useState({
		nome: '',
		tipo: 'L',
		pasta: '',
		telefone: ''
	})
	const [inputWarning, setInputWarning] = useState({
		nome: false,
		pasta: false
	})
	const [imovelData, setImovelData] = useState({
		dataLiq: '',
		escritura: '0',
		hipoteca: '0',
		numObra: '',
		codHist: '0',
		obs: '',
		cep: '',
		endereco: '',
		numero: '',
		compl: '',
		bairro: '',
		cidade: '',
		uf: ''
	})

	const localStorageData = JSON.parse(localStorage.getItem('userData'))

	const { id: usuario_id } = localStorageData

	const handleChangeMutuario = (event) => {
		const value = event.target.value
		setMutuarioData({
			...mutuarioData,
			[event.target.name]: value
		})
		setInputWarning(false)
	}

	const handleChangeImovel = (event) => {
		const value = event.target.value
		setImovelData({
			...imovelData,
			[event.target.name]: value
		})
	}

	const salvarMutuario = () => {
		if (mutuarioData.nome === '') {
			setInputWarning({ nome: true })
		} else if (mutuarioData.pasta === '') {
			setInputWarning({ pasta: true })
		} else {
			Swal.fire({
				title: 'Deseja salvar o mutuario no banco de dados',
				icon: 'question',
				showCancelButton: true,
				confirmButtonText: 'Salvar',
				showLoaderOnConfirm: true,
				preConfirm: () => {
					axios
						.post('/criar-mutuario-lei', {
							mutuarioData,
							imovelData,
							usuario_id
						})
						.then((response) => {
							if (response.data.mutuarioCriado === true) {
								Swal.fire('Mutuario Criado', '', 'success')
								return navigate('/mutuario/lei', {
									replace: true
								})
							} else if (response.data.mutuarioCriado === false) {
								Swal.fire(
									'Mutuario não foi criado',
									'',
									'error'
								)
								throw new Error('A pasta já existe!!')
							} else if (response.data.Erro) {
								throw new Error(response.data.Erro)
							}
						})
						.catch((error) => {
							Swal.fire(
								'Não foi possível salvar o mutuário.',
								'',
								'info'
							)
							Swal.showValidationMessage(error)
						})
				},
				allowOutsideClick: () => !Swal.isLoading()
			})
			// .then((result) => {
			// 	if (result.isConfirmed) {
			// 		Swal.fire({
			// 			icon: 'success',
			// 			title: 'O mutuário foi salvo no banco de dados'
			// 		})
			// 	} else if (result.D) {
			// 		Swal.fire({
			// 			icon: 'info',
			// 			title: 'As mudanças não foram salvas.'
			// 		})
			// 	}
			// })
			// .catch(() => {
			// 	Swal.fire({
			// 		icon: 'warning',
			// 		title: 'Não foi possível salvar o mutuário!'
			// 	})
			// })
		}
	}

	return (
		<div className=''>
			<div>
				<div className='row'>
					<div className='col'>
						<h1>Adicionar Mutuário - LEI</h1>
					</div>
					<div className='col'>
						<button className='btn btn-secondary float-end'>
							<Link to={`/mutuario/lei`}>
								<i className='bi bi-arrow-left'></i>Voltar
							</Link>
						</button>
					</div>
				</div>
			</div>
			<div className='container '>
				<div className='modal-body'>
					<h3 className='mt-5'>Dados gerais</h3>
					<hr />
					<form className='mt-5'>
						<div className='row'>
							<div className='mb-3 col-md-6 '>
								<label
									htmlFor='exampleInputEmail1'
									className='form-label'
								>
									Nome
								</label>
								<input
									type='text'
									className='form-control'
									name='nome'
									onChange={handleChangeMutuario}
								/>
								{inputWarning.nome && (
									<div className='animate__animated animate__shakeX'>
										<small style={{ color: 'red' }}>
											Obrigatório
										</small>
									</div>
								)}
							</div>
							<div className='mb-3 col-md-1'>
								<label
									htmlFor='exampleInputEmail1'
									className='form-label'
								>
									Tipo
								</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChangeMutuario}
									name='tipo'
									value='Lei'
								/>
							</div>
							<div className='mb-3 col-md-2'>
								<label
									htmlFor='exampleInputEmail1'
									className='form-label'
								>
									Pasta
								</label>
								<input
									placeholder='exemplo: L0023'
									type='text'
									className='form-control'
									name='pasta'
									onChange={handleChangeMutuario}
									style={{ textTransform: 'uppercase' }}
								/>
								{inputWarning.pasta && (
									<div className='animate__animated animate__shakeX'>
										<small style={{ color: 'red' }}>
											Obrigatório
										</small>
									</div>
								)}
							</div>
							<div className='mb-3 col-md-3'>
								<label
									htmlFor='exampleInputEmail1'
									className='form-label'
								>
									Telefone
								</label>
								<InputMask
									mask='(999) 99999-9999'
									type='text'
									className='form-control'
									id='exampleInputEmail1'
									aria-describedby='Telefone'
									name='telefone'
									onChange={handleChangeMutuario}
								/>
							</div>
						</div>
						<h3 className='mt-5'>Dados do imóvel</h3>
						<hr />
						<section className='mt-5 mb-4'>
							<div className='row'>
								<div className='mb-3 col-md-2'>
									<label
										htmlFor='exampleInputEmail1'
										className='form-label'
									>
										Data da liquidação
									</label>
									<input
										type='date'
										className='form-control'
										name='dataLiq'
										onChange={handleChangeImovel}
									/>
								</div>
								<div className='mb-3 col-md-1'>
									<label
										htmlFor='exampleInputEmail1'
										className='form-label'
									>
										Escritura
									</label>
									<select
										className='form-select'
										aria-label='Default select example'
										name='escritura'
										onChange={handleChangeImovel}
									>
										<option
											className='vermelho'
											value='0'
											defaultValue
										>
											Não
										</option>
										<option value='1'>Sim</option>
									</select>
								</div>
								<div className='mb-3 col-md-1'>
									<label
										htmlFor='exampleInputEmail1'
										className='form-label'
									>
										Hipoteca
									</label>
									<select
										className='form-select'
										aria-label='Default select example'
										name='hipoteca'
										onChange={handleChangeImovel}
									>
										<option
											className='vermelho'
											value='0'
											defaultValue
										>
											Não
										</option>
										<option value='1'>Sim</option>
									</select>
								</div>
								<div className='mb-3 col-md-2'>
									<label
										htmlFor='exampleInputEmail1'
										className='form-label'
									>
										Numero da obra
									</label>
									<input
										type='text'
										className='form-control'
										id='exampleInputEmail1'
										aria-describedby='emailHelp'
										name='numObra'
										onChange={handleChangeImovel}
									/>
								</div>
								<div className='mb-3 col-md-2'>
									<label
										htmlFor='exampleInput'
										className='form-label'
									>
										Código Historico
									</label>
									<input
										type='text'
										className='form-control'
										id='exampleInputEmail1'
										name='codHist'
										onChange={handleChangeImovel}
									/>
								</div>
								<div className='mb-3 col-md-4'>
									<label
										htmlFor='observacao'
										className='form-label'
									>
										Observação
									</label>
									<input
										type='text'
										className='form-control'
										id='observacao'
										aria-describedby='emailHelp'
										name='obs'
										onChange={handleChangeImovel}
									/>
								</div>
							</div>
						</section>
						<div className='row'>
							<div className='mb-3 col-md-2'>
								<label htmlFor='CEP' className='form-label'>
									CEP
								</label>
								<InputMask
									mask='99999-999'
									type='text'
									className='form-control'
									id='CEP'
									aria-describedby='emailHelp'
									name='cep'
									onChange={handleChangeImovel}
								/>
							</div>
							<div className='mb-3 col-md-3'>
								<label
									htmlFor='endereco'
									className='form-label'
								>
									Endereço
								</label>
								<input
									type='text'
									className='form-control'
									id='endereco'
									aria-describedby='emailHelp'
									name='endereco'
									onChange={handleChangeImovel}
								/>
							</div>
							<div className='mb-3 col-md-1'>
								<label
									htmlFor='exampleInputEmail1'
									className='form-label'
								>
									Número
								</label>
								<input
									type='text'
									className='form-control'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									name='numero'
									onChange={handleChangeImovel}
								/>
							</div>
							<div className='mb-3 col-md-1'>
								<label
									htmlFor='exampleInputEmail1'
									className='form-label'
								>
									Complem.
								</label>
								<input
									type='text'
									className='form-control'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									name='compl'
									onChange={handleChangeImovel}
								/>
							</div>
							<div className='mb-3 col-md-2'>
								<label
									htmlFor='exampleInputEmail1'
									className='form-label'
								>
									Bairro
								</label>
								<input
									type='text'
									className='form-control'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									name='bairro'
									onChange={handleChangeImovel}
								/>
							</div>
							<div className='mb-3 col-md-2'>
								<label
									htmlFor='exampleInputEmail1'
									className='form-label'
								>
									Cidade
								</label>
								<input
									type='text'
									className='form-control'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									name='cidade'
									onChange={handleChangeImovel}
								/>
							</div>
							<div className='mb-3 col-md-1'>
								<label
									htmlFor='exampleInputEmail1'
									className='form-label'
								>
									UF
								</label>
								<input
									type='char'
									className='form-control'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									name='uf'
									onChange={handleChangeImovel}
									maxlength='2'
									style={{ textTransform: 'uppercase' }}
								/>
							</div>
						</div>
					</form>
					<div>
						{/* -----------------------------------Fim form ------------------------------------ */}
					</div>
					<hr />
					<div className='row mt-5'>
						<div className='col'>
							<button className='btn btn-secondary '>
								<Link to={`/mutuario/lei`}>
									<i className='bi bi-arrow-left'></i>Voltar
								</Link>
							</button>
						</div>
						<div className='col'>
							<button
								type='button'
								className='btn btn-success float-end'
								onClick={salvarMutuario}
							>
								Salvar Mutuário
								<i className='bi bi-save2 ms-2'></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FormAdicionarMutuario

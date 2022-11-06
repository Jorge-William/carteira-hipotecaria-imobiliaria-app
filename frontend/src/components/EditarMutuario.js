import { useState, useEffect } from 'react'
import { SkeletonEditarMutuario } from './Skeleton.editarMutuario'
import axios from 'axios'
import Swal from 'sweetalert2'
export function EditarMutuario({ dadosMutuario }) {
	const [dados, setDados] = useState()
	// const [novosDados, setNovosDados] = useState()
console.log(dados);
	useEffect(() => {
		setTimeout(() => {
			setDados(dadosMutuario.result[0])
		}, 2000)
	}, [dadosMutuario])

	const userData = JSON.parse(localStorage.getItem('userData'))
	const usuario_id = userData.id

	function handleChange(event) {
		const value = event.target.value

		setDados({
			...dados,
			[event.target.name]: value
		})
	}
	// const dadosAtuais = JSON.parse(dados)
	const handleSave = (id) => {
		Swal.fire({
			title: 'Deseja salvar as alterações?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sim salvar',
			showLoaderOnConfirm: true,
			preConfirm: () => {
				return axios
					.post('/editar-mutuario', {
						params: {
							id,
							usuario_id,
							dados
						}
					})
					.then((response) => {
						console.log(response)
						if (!response.data.result) {
							throw new Error()
						}
						// props.callbackFilter()
						// setTableData({id: '', tipo: '', abrev: '', descricao: ''})
						// setShowTable(false)
						// setValorBusca('0')
						return response
					})
					.catch((error) => {
						Swal.showValidationMessage(`Request failed: ${error}`)
					})
			},
			allowOutsideClick: () => !Swal.isLoading()
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					icon: 'success',
					title: 'As alterações foram salvas!'
				})
			}
		})
	}

	// const { nome, bairro, rotulo } = dados.result[0]
	return !dados ? (
		<SkeletonEditarMutuario />
	) : (
		<section className='mt-4'>
			<div className='row d-flex justify-content-center'>
				<h1 className='d-inline-flex justify-content-center'>
					Editar Mutuário
				</h1>
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
									placeholder={dados.nome}
									onChange={handleChange}
								/>
								{/* {inputWarning.nome && (
									<div className='animate__animated animate__shakeX'>
										<small style={{ color: 'red' }}>
											Obrigatório
										</small>
									</div>
								)} */}
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
									onChange={handleChange}
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
									type='text'
									className='form-control'
									name='pasta'
									placeholder={dados.rotulo}
									onChange={handleChange}
									style={{ textTransform: 'uppercase' }}
								/>
								{/* {inputWarning.pasta && (
									<div className='animate__animated animate__shakeX'>
										<small style={{ color: 'red' }}>
											Obrigatório
										</small>
									</div>
								)} */}
							</div>
							<div className='mb-3 col-md-3'>
								<label
									htmlFor='exampleInputEmail1'
									className='form-label'
								>
									Telefone
								</label>
								<input
									type='text'
									className='form-control'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									name='telefone'
									placeholder={dados.telefone}
									onChange={handleChange}
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
										name='dt_liq'
										value={dados.dt_liq}
										onChange={handleChange}
									/>
								</div>
								<div className='mb-3 col-md-1'>
									<label
										htmlFor='exampleInputEmail1'
										className='form-label'
									>
										Escritura
									</label>

									{dados.escritura === 1 ? (
										<select
											className='form-select'
											aria-label='Default select example'
											name='escritura'
											onChange={handleChange}
										>
											<option value={1} selected>
												Sim
											</option>
											<option
												className='vermelho'
												value={0}
											>
												Não
											</option>
										</select>
									) : (
										<select
											className='form-select'
											aria-label='Default select example'
											name='escritura'
											onChange={handleChange}
										>
											<option
												className='vermelho'
												value={0}
												selected
											>
												Não
											</option>
											<option value={1}>Sim</option>
										</select>
									)}
								</div>
								<div className='mb-3 col-md-1'>
									<label
										htmlFor='hipoteca'
										className='form-label'
									>
										Hipoteca
									</label>
									{dados.hipoteca === 1 ? (
										<select
										id='hipoteca'
											className='form-select'
											aria-label='Default select example'
											name='hipoteca'
											onChange={handleChange}
										>
											<option value={1} selected>
												Sim
											</option>
											<option
												className='vermelho'
												value={0}
											>
												Não
											</option>
										</select>
									) : (
										<select
										id='hipoteca'

											className='form-select'
											aria-label='Default select example'
											name='hipoteca'
											onChange={handleChange}
										>
											<option
												className='vermelho'
												value={0}
												selected
											>
												Não
											</option>
											<option value={1}>Sim</option>
										</select>
									)}
								</div>
								<div className='mb-3 col-md-2'>
									<label
										htmlFor='num_obra'
										className='form-label'
									>
										Numero da obra
									</label>
									<input
										type='text'
										className='form-control'
										id='num_obra'
										aria-describedby='emailHelp'
										name='num_obra'
										placeholder={dados.num_obra}
										onChange={handleChange}
									/>
								</div>
								<div className='mb-3 col-md-2'>
									<label
										htmlFor='cod_hist'
										className='form-label'
									>
										Código Historico
									</label>
									<input
										type='text'
										className='form-control'
										id='cod_hist'
										name='cod_historico'
										placeholder={dados.cod_historico}
										onChange={handleChange}
									/>
								</div>
								<div className='mb-3 col-md-4'>
									<label
										htmlFor='obs'
										className='form-label'
									>
										Observação
									</label>
									<input
										type='text'
										className='form-control'
										id='obs'
										aria-describedby='emailHelp'
										name='obs'
										placeholder={dados.obs}
										onChange={handleChange}
									/>
								</div>
							</div>
						</section>
						<div className='row'>
							<div className='mb-3 col-md-2'>
								<label
									htmlFor='cep'
									className='form-label'
								>
									CEP
								</label>
								<input
									type='text'
									className='form-control'
									id='cep'
									aria-describedby='emailHelp'
									name='cep'
									placeholder={dados.cep}
									onChange={handleChange}
								/>
							</div>
							<div className='mb-3 col-md-3'>
								<label
									htmlFor='end'
									className='form-label'
								>
									Endereço
								</label>
								<input
									type='text'
									className='form-control'
									id='end'
									aria-describedby='emailHelp'
									name='end'
									placeholder={dados.end}
									onChange={handleChange}
								/>
							</div>
							<div className='mb-3 col-md-1'>
								<label
									htmlFor='numero'
									className='form-label'
								>
									Número
								</label>
								<input
									type='text'
									className='form-control'
									id='numero'
									aria-describedby='emailHelp'
									name='numero'
									placeholder={dados.numero}
									onChange={handleChange}
								/>
							</div>
							<div className='mb-3 col-md-2'>
								<label
									htmlFor='complem'
									className='form-label'
								>
									Complemento
								</label>
								<input
									type='text'
									className='form-control'
									id='complem'
									aria-describedby='emailHelp'
									name='complemento'
									placeholder={dados.complemento}
									onChange={handleChange}
								/>
							</div>
							<div className='mb-3 col-md-2'>
								<label
									htmlFor='bairro'
									className='form-label'
								>
									Bairro
								</label>
								<input
									type='text'
									className='form-control'
									id='bairro'
									aria-describedby='emailHelp'
									name='bairro'
									placeholder={dados.bairro}
									onChange={handleChange}
								/>
							</div>
							<div className='mb-3 col-md-2'>
								<label
									htmlFor='cidade'
									className='form-label'
								>
									Cidade
								</label>
								<input
									type='text'
									className='form-control'
									id='cidade'
									aria-describedby='emailHelp'
									name='cidade'
									placeholder={dados.cidade}
									onChange={handleChange}
								/>
							</div>
							<div className='mb-3 col-md-1'>
								<label
									htmlFor='uf'
									className='form-label'
								>
									UF
								</label>
								<input
									type='text'
									className='form-control'
									id='uf'
									aria-describedby='emailHelp'
									name='uf'
									placeholder={dados.uf}
									onChange={handleChange}
								/>
							</div>
						</div>
					</form>
					<div>
						{/* -----------------------------------Fim form ------------------------------------ */}
					</div>
					<hr />
					<div className='row mt-5'>
						{/* <div className='col'>
							<button className='btn btn-secondary '>
								<Link to={`/mutuario/lei`}>
									<i className='bi bi-arrow-left'></i>Voltar
								</Link>
							</button>
						</div> */}
						<div className='col'>
							<button
								type='button'
								className='btn btn-success float-end'
								onClick={() => handleSave(dados.id)}
							>
								Salvar Alterações
								<i className='bi bi-save2 ms-2'></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

import { useState, useEffect } from 'react'
import { SkeletonEditarMutuario } from './Skeleton.editarMutuario'

export function EditarMutuario({ dadosMutuario }) {
	const [dados, setDados] = useState()

	useEffect(() => {
		setTimeout(() => {
			setDados(dadosMutuario)
		}, 2000)
	}, [dados, dadosMutuario])

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
									placeholder={dados.result[0].nome}
									// onChange={handleChangeMutuario}
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
									// onChange={handleChangeMutuario}
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
									placeholder={dados.result[0].rotulo}
									// onChange={handleChangeMutuario}
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
									placeholder={dados.result[0].telefone}
									// onChange={handleChangeMutuario}
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
										placeholder={dados.result[0].dataLiq}
										// onChange={handleChangeImovel}
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
										// onChange={handleChangeImovel}
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
										// onChange={handleChangeImovel}
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
										placeholder={dados.result[0].num_obra}
										// onChange={handleChangeImovel}
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
										placeholder={
											dados.result[0].cod_historico
										}
										// onChange={handleChangeImovel}
									/>
								</div>
								<div className='mb-3 col-md-4'>
									<label
										htmlFor='exampleInputEmail1'
										className='form-label'
									>
										Observação
									</label>
									<input
										type='text'
										className='form-control'
										id='exampleInputEmail1'
										aria-describedby='emailHelp'
										name='obs'
										placeholder={dados.result[0].obs}
										// onChange={handleChangeImovel}
									/>
								</div>
							</div>
						</section>
						<div className='row'>
							<div className='mb-3 col-md-2'>
								<label
									htmlFor='exampleInputEmail1'
									className='form-label'
								>
									CEP
								</label>
								<input
									type='text'
									className='form-control'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									name='cep'
									placeholder={dados.result[0].cep}
									// onChange={handleChangeImovel}
								/>
							</div>
							<div className='mb-3 col-md-3'>
								<label
									htmlFor='exampleInputEmail1'
									className='form-label'
								>
									Endereço
								</label>
								<input
									type='text'
									className='form-control'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									name='endereco'
									placeholder={dados.result[0].end}
									// onChange={handleChangeImovel}
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
									placeholder={dados.result[0].numero}
									// onChange={handleChangeImovel}
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
									placeholder={dados.result[0].complemento}
									// onChange={handleChangeImovel}
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
									placeholder={dados.result[0].bairro}
									// onChange={handleChangeImovel}
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
									placeholder={dados.result[0].cidade}
									// onChange={handleChangeImovel}
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
									type='text'
									className='form-control'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									name='uf'
									placeholder={dados.result[0].uf}
									// onChange={handleChangeImovel}
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
								// onClick={}
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

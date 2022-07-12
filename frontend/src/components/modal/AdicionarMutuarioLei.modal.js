const AdicionarMutuarioLei = () => {
	return (
		<>
			{/* ---------------------------------------- Modal -------------------------------------- */}
			<div
				className='modal fade'
				id='staticBackdrop-mutuario'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabIndex='-1'
				aria-labelledby='staticBackdropLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog modal-xl modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h1 className='modal-title' id='staticBackdropLabel'>
								Adicionar Mutuário
							</h1>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='container'>
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
												type='email'
												className='form-control'
												id='exampleInputEmail1'
												aria-describedby='emailHelp'
											/>
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
												id='exampleInputEmail1'
												aria-describedby='emailHelp'
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
												placeholder='L0023'
												type='text'
												className='form-control'
												id='exampleInputEmail1'
												aria-describedby='emailHelp'
											/>
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
													id='exampleInputEmail1'
													aria-describedby='emailHelp'
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
												>
													<option
														className='vermelho'
														selected
													>
														Não
													</option>
													<option value='Sim'>
														Sim
													</option>
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
												>
													<option selected>
														Não
													</option>
													<option value='Sim'>
														Sim
													</option>
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
											/>
										</div>
									</div>
								</form>
								<div>
									{/* -----------------------------------Fim form ------------------------------------ */}
								</div>
							</div>
						</div>
						<div className='modal-footer mt-5'>
							<button
								type='button'
								className='btn btn-success btn-lg'
							>
								Salvar
								<i className='bi bi-save2 ms-2'></i>
							</button>
							<button
								type='button'
								className='btn btn-danger btn-lg'
								data-bs-dismiss='modal'
							>
								Cancelar
								<i className='bi bi-x-octagon-fill ms-2' />
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AdicionarMutuarioLei

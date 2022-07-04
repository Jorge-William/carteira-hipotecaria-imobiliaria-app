const AdicionarMutuarioLei = () => {
	return (
		<>
			{/* ---------------------------------------- Modal -------------------------------------- */}
			<div
				class='modal fade'
				id='staticBackdrop-mutuario'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				tabindex='-1'
				aria-labelledby='staticBackdropLabel'
				aria-hidden='true'
			>
				<div class='modal-dialog modal-xl modal-dialog-centered'>
					<div class='modal-content'>
						<div class='modal-header'>
							<h1 class='modal-title' id='staticBackdropLabel'>
								Adicionar Mutuário
							</h1>
							<button
								type='button'
								class='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='container'>
							<div class='modal-body'>
								<h3 className='mt-5'>Dados gerais</h3>
								<hr />
								<form className='mt-5'>
									<div className='row'>
										<div className='mb-3 col-md-6 '>
											<label
												for='exampleInputEmail1'
												class='form-label'
											>
												Nome
											</label>
											<input
												type='email'
												class='form-control'
												id='exampleInputEmail1'
												aria-describedby='emailHelp'
											/>
										</div>
										<div className='mb-3 col-md-1'>
											<label
												for='exampleInputEmail1'
												class='form-label'
											>
												Tipo
											</label>
											<input
												value='Lei'
												type='text'
												class='form-control'
												id='exampleInputEmail1'
												aria-describedby='emailHelp'
											/>
										</div>
										<div className='mb-3 col-md-2'>
											<label
												for='exampleInputEmail1'
												class='form-label'
											>
												Pasta
											</label>
											<input
												value='L0023'
												type='text'
												class='form-control'
												id='exampleInputEmail1'
												aria-describedby='emailHelp'
											/>
										</div>
										<div className='mb-3 col-md-3'>
											<label
												for='exampleInputEmail1'
												class='form-label'
											>
												Telefone
											</label>
											<input
												type='text'
												class='form-control'
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
													for='exampleInputEmail1'
													class='form-label'
												>
													Data da liquidação
												</label>
												<input
													type='date'
													class='form-control'
													id='exampleInputEmail1'
													aria-describedby='emailHelp'
												/>
											</div>
											<div className='mb-3 col-md-1'>
												<label
													for='exampleInputEmail1'
													class='form-label'
												>
													Escritura
												</label>
												<select
													class='form-select'
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
													for='exampleInputEmail1'
													class='form-label'
												>
													Hipoteca
												</label>
												<select
													class='form-select'
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
													for='exampleInputEmail1'
													class='form-label'
												>
													Numero da obra
												</label>
												<input
													type='text'
													class='form-control'
													id='exampleInputEmail1'
													aria-describedby='emailHelp'
												/>
											</div>
											<div className='mb-3 col-md-2'>
												<label
													for='exampleInput'
													class='form-label'
												>
													Código Historico
												</label>
												<input
													type='text'
													class='form-control'
													id='exampleInputEmail1'
												/>
											</div>
											<div className='mb-3 col-md-4'>
												<label
													for='exampleInputEmail1'
													class='form-label'
												>
													Observação
												</label>
												<input
													type='text'
													class='form-control'
													id='exampleInputEmail1'
													aria-describedby='emailHelp'
												/>
											</div>
										</div>
									</section>
									<div className='row'>
										<div className='mb-3 col-md-2'>
											<label
												for='exampleInputEmail1'
												class='form-label'
											>
												CEP
											</label>
											<input
												type='text'
												class='form-control'
												id='exampleInputEmail1'
												aria-describedby='emailHelp'
											/>
										</div>
										<div className='mb-3 col-md-3'>
											<label
												for='exampleInputEmail1'
												class='form-label'
											>
												Endereço
											</label>
											<input
												type='text'
												class='form-control'
												id='exampleInputEmail1'
												aria-describedby='emailHelp'
											/>
										</div>
										<div className='mb-3 col-md-1'>
											<label
												for='exampleInputEmail1'
												class='form-label'
											>
												Número
											</label>
											<input
												type='text'
												class='form-control'
												id='exampleInputEmail1'
												aria-describedby='emailHelp'
											/>
										</div>
										<div className='mb-3 col-md-1'>
											<label
												for='exampleInputEmail1'
												class='form-label'
											>
												Complem.
											</label>
											<input
												type='text'
												class='form-control'
												id='exampleInputEmail1'
												aria-describedby='emailHelp'
											/>
										</div>
										<div className='mb-3 col-md-2'>
											<label
												for='exampleInputEmail1'
												class='form-label'
											>
												Bairro
											</label>
											<input
												type='text'
												class='form-control'
												id='exampleInputEmail1'
												aria-describedby='emailHelp'
											/>
										</div>
										<div className='mb-3 col-md-2'>
											<label
												for='exampleInputEmail1'
												class='form-label'
											>
												Cidade
											</label>
											<input
												type='text'
												class='form-control'
												id='exampleInputEmail1'
												aria-describedby='emailHelp'
											/>
										</div>
										<div className='mb-3 col-md-1'>
											<label
												for='exampleInputEmail1'
												class='form-label'
											>
												UF
											</label>
											<input
												type='text'
												class='form-control'
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
						<div class='modal-footer mt-5'>
							<button
								type='button'
								class='btn btn-success btn-lg'
							>
								Salvar
								<i class='bi bi-save2 ms-2'></i>
							</button>
							<button
								type='button'
								class='btn btn-danger btn-lg'
								data-bs-dismiss='modal'
							>
								Cancelar
								<i class='bi bi-x-octagon-fill ms-2' />
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AdicionarMutuarioLei

import React, { useState } from 'react'
import '../style/Autocomplete.css'

const Autocomplete = (props) => {
	const [active, setActive] = useState(0)
	const [filtered, setFiltered] = useState([])
	const [isShow, setIsShow] = useState(false)
	const [input, setInput] = useState('')
	const [filter, setFilter] = useState(null)

	const onChange = (e) => {
		const { suggestions } = props
		const input = e.currentTarget.value
		const newFilteredSuggestions = suggestions.filter(
			(suggestion) =>
				suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
		)
		setActive(0)
		setFiltered(newFilteredSuggestions)
		setIsShow(true)
		setInput(e.currentTarget.value)
	}
	const onClick = (e) => {
		setActive(0)
		setFiltered([])
		setIsShow(false)
		setInput(e.currentTarget.innerText)
	}
	const onKeyDown = (e) => {
		if (e.keyCode === 13) {
			// enter key
			setActive(0)
			setIsShow(false)
			setInput(filtered[active])
		} else if (e.keyCode === 38) {
			// up arrow
			return active === 0 ? null : setActive(active - 1)
		} else if (e.keyCode === 40) {
			// down arrow
			return active - 1 === filtered.length ? null : setActive(active + 1)
		}
	}
	const renderAutocomplete = () => {
		if (isShow && input) {
			if (filtered.length) {
				return (
					<ul className='autocomplete ms-3'>
						{filtered.map((suggestion, index) => {
							let className
							if (index === active) {
								className = 'active'
							}
							return (
								<li
									className={className}
									key={index}
									onClick={onClick}
								>
									{suggestion}
								</li>
							)
						})}
					</ul>
				)
			} else {
				return (
					<div className='no-autocomplete'>
						<em style={{ color: 'red' }}>
							Não encontrado. Verifique se o tipo do dado está
							correto.
						</em>
					</div>
				)
			}
		}
		return <></>
	}
	// const { data } = props
	// const buscaMutuario = async (event) => {
	// 	event.preventDefault()
	// 	return console.log(await data.find((item) => item.rotulo === input))

	// }
	// console.log(Array.from(Object.values(data), (breed) => breed.rotulo))

	const { placeholder, data, tipo } = props

	return (
		<div className='row'>
			<form
				onSubmit={(e) => {
					e.preventDefault()
				}}
				className=' row'
			>
				<div class='input-group mb-1 col'>
					<input
						type='text'
						class='form-control'
						aria-label="Recipient's username"
						aria-describedby='button-addon2'
						placeholder={placeholder}
						onChange={onChange}
						onKeyDown={onKeyDown}
						value={input}
					/>
				</div>
				<button
					class='btn btn-outline-success m-2 col-3'
					type='submit'
					id='button-addon2'
					tipo={tipo}
					onClick={() => {
						if (tipo === 'rotulo') {
							setFilter(
								data.find((item) => {
									return item.rotulo === input
								})
							)
						} else if ('nome') {
							setFilter(
								data.find((item) => {
									return item.nome === input
								})
							)
						}
					}}
				>
					Buscar
				</button>
			</form>
			{renderAutocomplete()}
			<div className='row'>
				<div className='col mt-3'>
					{filter && (
						<table className='table table-striped table-bordered'>
							<thead>
								<tr>
									<th scope='col'>#</th>
									<th scope='col'>Pasta</th>
									<th scope='col'>Nome</th>
									<th scope='col'>Endreço</th>
									<th scope='col'>Nº</th>
									<th scope='col'>Complemento</th>
									<th scope='col'>Bairro</th>
									<th scope='col'>Cidade</th>
									<th scope='col'>UF</th>
									<th scope='col'>Esc</th>
									<th scope='col'>Hip</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope='row'>{filter.id}</th>
									<td>{filter.rotulo}</td>
									{/*  Link nomes */}
									<td>
										{/* ---------------------------------------- Modal -------------------------------------- */}

										<a
											data-bs-toggle='modal'
											data-bs-target='#exampleModal2'
											// onClick={() => setLiberaModal()}
										>
											{filter.nome}
										</a>
									</td>
									<td>{filter.imoveis_leis[0].end}</td>
									<td>{filter.imoveis_leis[0].numero}</td>
									<td>
										{filter.imoveis_leis[0].complemento}
									</td>
									<td>{filter.imoveis_leis[0].bairro}</td>
									<td>{filter.imoveis_leis[0].cidade}</td>
									<td>{filter.imoveis_leis[0].uf}</td>
									<td>{filter.imoveis_leis[0].escritura}</td>
									<td>{filter.imoveis_leis[0].hipoteca}</td>
								</tr>
							</tbody>
							<button
								className='btn btn-outline-danger mt-3'
								onClick={() => setFilter(false)}
							>
								Redefinir busca
							</button>
						</table>
					)}
				</div>
			</div>

			{filter && (
				<div
					class='modal fade'
					id='exampleModal2'
					data-bs-backdrop='static'
					data-bs-keyboard='false'
					tabindex='-1'
					aria-labelledby='staticBackdropLabel'
					aria-hidden='true'
				>
					<div class='modal-dialog modal-xl modal-dialog-centered'>
						<div class='modal-content'>
							<div class='modal-header'>
								<h2
									class='modal-title'
									id='staticBackdropLabel'
								>
									Detalhes
								</h2>
								<button
									type='button'
									class='btn-close'
									data-bs-dismiss='modal'
									aria-label='Close'
								></button>
							</div>
							<div class='modal-body'>
								<div className='container'>
									<div className='row justify-content-center'>
										<div className='mt-3 mb-5 col-4 text-center'>
											<h3>{filter.nome}</h3>
										</div>
									</div>
									{/* <hr /> */}
									<div className='container'>
										<div className='row  justify-content-center'>
											<div className='col-8 mb-5'>
												<div className='row mt-3 mb-5'>
													<div className='col-4'>
														<strong>Pasta: </strong>
														{filter.rotulo}
													</div>
													<div className='col-4'>
														<strong>
															Telefone:{' '}
														</strong>
														{
															filter
																.imoveis_leis[0]
																.telefone
														}
													</div>
													<div className='col-4'>
														Tipo Lei
													</div>
												</div>
												<h4>Imóvel</h4>
												<div className='row mt-5'>
													<div className='col'>
														<strong>
															Data de liquidação:
														</strong>{' '}
														{
															filter
																.imoveis_leis[0]
																.dt_liq
														}
													</div>
													<div className='col'>
														<strong>
															Escritura:{' '}
														</strong>
														{filter.imoveis_leis[0]
															.escritura === 1 ? (
															<p>Sim</p>
														) : (
															<p>Não</p>
														)}
													</div>
													<div className='col'>
														<strong>
															Hipoteca:{' '}
														</strong>
														{filter.imoveis_leis[0]
															.hipoteca === 1 ? (
															<p>Sim</p>
														) : (
															<p>Não</p>
														)}
													</div>
												</div>
												<div className='row mt-3'>
													<div className='col'>
														<strong>
															Número da obra:{' '}
														</strong>
														{
															filter
																.imoveis_leis[0]
																.num_obra
														}
													</div>
													<div className='col'>
														<strong>
															Código Histórico:{' '}
														</strong>
														{
															filter
																.imoveis_leis[0]
																.cod_historico
														}
													</div>
													<div className='col'>
														<strong>
															Observação:{' '}
														</strong>
														{
															filter
																.imoveis_leis[0]
																.obs
														}
													</div>
												</div>
												<div className='row mt-3'>
													<div className='col-6'>
														<strong>
															Endereço:
														</strong>{' '}
														{
															filter
																.imoveis_leis[0]
																.end
														}
													</div>
													<div className='col'>
														<strong>Número:</strong>{' '}
														{
															filter
																.imoveis_leis[0]
																.numero
														}
													</div>
													<div className='col'>
														<strong>CEP:</strong>{' '}
														{
															filter
																.imoveis_leis[0]
																.cep
														}
													</div>
												</div>
												<div className='row mt-3'>
													<div className='col'>
														<strong>Bairro:</strong>{' '}
														{
															filter
																.imoveis_leis[0]
																.bairro
														}
													</div>
													<div className='col'>
														<strong>Comp:</strong>{' '}
														{
															filter
																.imoveis_leis[0]
																.complemento
														}
													</div>
													<div className='col'>
														<strong>
															Cidade:{' '}
														</strong>
														{
															filter
																.imoveis_leis[0]
																.cidade
														}
													</div>
													<div className='col'>
														<strong>UF: </strong>
														{
															filter
																.imoveis_leis[0]
																.uf
														}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class='modal-footer'>
								<button
									type='button'
									class='btn btn-outline-success'
								>
									Documentos
								</button>

								<button
									type='button'
									class='btn btn-secondary'
									data-bs-dismiss='modal'
								>
									Fechar
								</button>
								<button
									type='button'
									class='btn btn-outline-warning'
								>
									Editar
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
export default Autocomplete

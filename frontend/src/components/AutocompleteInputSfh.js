import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../style/Autocomplete.css'

const AutocompleteSfh = (props) => {
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

	const { placeholder, data, tipo } = props
	return (
		<div className='row'>
			<form
				onSubmit={(e) => {
					e.preventDefault()
				}}
				className=' row'
			>
				<div className='input-group mb-1 col'>
					<input
						type='text'
						className='form-control'
						aria-label="Recipient's username"
						aria-describedby='button-addon2'
						placeholder={placeholder}
						onChange={onChange}
						onKeyDown={onKeyDown}
						value={input}
					/>
				</div>
				<button
					className='btn btn-outline-success m-2 col-3'
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
						} else if (tipo === 'nome') {
							setFilter(
								data.find((item) => {
									return item.nome === input
								})
							)
						} else {
							setFilter(
								data.find((item) => {
									return item.imoveis_sfhs[0].end === input
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
						<>
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

											{/* <a
											data-bs-toggle='modal'
											data-bs-target='#exampleModal2'
											// onClick={() => setLiberaModal()}
										> */}
											{
												<Link
													to={`/detalhes-sfh/${filter.id}`}
												>
													{filter.nome}
												</Link>
											}
											{/* </a> */}
										</td>
										<td>
											{filter.imoveis_sfhs.length ===
											0 ? (
												<p>-----</p>
											) : (
												filter.imoveis_sfhs[0].end
											)}
										</td>
										<td>
											{filter.imoveis_sfhs.length ===
											0 ? (
												<p>-----</p>
											) : (
												filter.imoveis_sfhs[0].numero
											)}
										</td>
										<td>
											{filter.imoveis_sfhs.length ===
											0 ? (
												<p>-----</p>
											) : (
												filter.imoveis_sfhs[0]
													.complemento
											)}
										</td>
										<td>
											{filter.imoveis_sfhs.length ===
											0 ? (
												<p>-----</p>
											) : (
												filter.imoveis_sfhs[0].bairro
											)}
										</td>
										<td>
											{filter.imoveis_sfhs.length ===
											0 ? (
												<p>-----</p>
											) : (
												filter.imoveis_sfhs[0].cidade
											)}
										</td>
										<td>
											{filter.imoveis_sfhs.length ===
											0 ? (
												<p>-----</p>
											) : (
												filter.imoveis_sfhs[0].uf
											)}
										</td>
										<td>
											{filter.imoveis_sfhs.length !== 0 &&
												(filter.imoveis_sfhs[0]
													.escritura === 1 ? (
													<i className='ms-3 bi disponivel bi-file-earmark-text'></i>
												) : (
													<i className='ms-3 bi indisponivel bi-file-earmark-text'></i>
												))}
										</td>
										<td>
											{filter.imoveis_sfhs.length !== 0 &&
												(filter.imoveis_sfhs[0]
													.hipoteca === 1 ? (
													<i className='ms-2 bi disponivel bi-house'></i>
												) : (
													<i className='ms-2 bi indisponivel bi-house'></i>
												))}
										</td>{' '}
									</tr>
								</tbody>
							</table>
							<button
								className='btn btn-outline-danger mt-3'
								onClick={() => setFilter(false)}
							>
								Redefinir busca
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
export default AutocompleteSfh
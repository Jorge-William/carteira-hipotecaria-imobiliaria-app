import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Pagination from './Pagination'

const FiltroMutuarioLei = (data) => {
	const [busca, setBusca] = useState({
		nome: '',
		complemento: '',
		bairro: '',
		rotulo: '',
		end: '',
		cidade: '',
		numero: ''
	})
	const [itensPorPagina, setItensPorPagina] = useState({ itens: 15 })
	const [currentPage, setCurrentPage] = useState(1)

	const callback = () => {
		setBusca({
			nome: '',
			complemento: '',
			bairro: '',
			rotulo: '',
			end: '',
			cidade: '',
			numero: ''
		})
		setCurrentPage(1)
		setItensPorPagina({ itens: 15 })
	}

	const asArray = Object.entries(data)[0][1][0]

	useEffect(() => {
		// console.log('OIIIIII JORGE')
	}, [busca])

	console.log(asArray)
	const lowercaseBairro = busca.bairro.toLowerCase()
	const lowercaseNome = busca.nome.toLowerCase()
	const lowercaseComplemento = busca.complemento.toLowerCase()
	const lowercaseRotulo = busca.rotulo.toLowerCase()
	const lowercaseCidade = busca.cidade.toLowerCase()
	const lowercaseEnd = busca.end.toLowerCase()
	const lowercaseNum = busca.numero.toLowerCase()

	// const noUndefinedItems = asArray.map((item) =>
	// 	// (item) => item.imoveis_leis.end !== undefined
	// 	console.log(item.imoveis_leis[0])
	// )
	// console.log(noUndefinedItems)

	const handleChange = (event) => {
		const value = event.target.value
		const name = event.target.name

		setBusca({ ...busca, [name]: value })
	}

	const handleItens = (event) => {
		const value = event.target.value
		const name = event.target.name

		setItensPorPagina({ ...itensPorPagina, [name]: value })
	}

	const itensFiltrados = asArray.filter((item) => {
		// item.includes(busca.toLowerCase())
		// .filter((item) => item !== undefined)

		//  ||
		// 	item.bairro.toLowerCase().includes(lowercaseBairro)
		//
		return (
			item.nome.toLowerCase().includes(lowercaseNome) &&
			item.imoveis_leis[0].end.toLowerCase().includes(lowercaseEnd) &&
			item.imoveis_leis[0].complemento
				.toLowerCase()
				.includes(lowercaseComplemento) &&
			item.imoveis_leis[0].bairro
				.toLowerCase()
				.includes(lowercaseBairro) &&
			item.rotulo.toLowerCase().includes(lowercaseRotulo) &&
			item.imoveis_leis[0].cidade
				.toLowerCase()
				.includes(lowercaseCidade) &&
			item.imoveis_leis[0].numero.toLowerCase().includes(lowercaseNum) &&
			item.imoveis_leis[0].cidade.toLowerCase().includes(lowercaseCidade)
		)
	})

	const currentTableData = useMemo(() => {
		const firstPageIndex =
			(currentPage - 1) * Number.parseInt(itensPorPagina.itens)
		const lastPageIndex =
			firstPageIndex + Number.parseInt(itensPorPagina.itens)
		return itensFiltrados.slice(firstPageIndex, lastPageIndex)
	}, [currentPage, itensFiltrados, itensPorPagina])
	// console.log(itensFiltrados)
	return (
		<div className='mt-5'>
			<form>
				<div className='row'>
					<div className='col-1'>
						<input
							className='form-control'
							list='rotulo'
							id='campo-rotulo'
							placeholder='Pasta'
							onChange={handleChange}
							name='rotulo'
							value={busca.rotulo}
						/>
						<datalist id='rotulo'>
							{asArray.map((item, key) => {
								return <option key={key} value={item.rotulo} />
							})}
						</datalist>
					</div>
					<div className='col'>
						<input
							className='form-control'
							list='nome'
							id='campo-nome'
							placeholder='Nome'
							onChange={handleChange}
							name='nome'
							value={busca.nome}
						/>
						<datalist id='nome'>
							{asArray.map((item, key) => {
								return <option key={key} value={item.nome} />
							})}
						</datalist>
					</div>
					<div className='col'>
						<input
							className='form-control'
							list='endereco'
							id='campo-endereco'
							placeholder='Endereço'
							name='end'
							onChange={handleChange}
							value={busca.end}
						/>
						<datalist id='endereco'>
							{asArray.map((item, key) => {
								return (
									<option
										key={key}
										value={item.imoveis_leis[0].end}
									/>
								)
							})}
						</datalist>
					</div>
					<div className='col-1'>
						<input
							className='form-control'
							list='numero'
							id='campo-numero'
							placeholder='N°'
							name='numero'
							onChange={handleChange}
							value={busca.numero}
						/>
						<datalist id='numero'>
							{asArray.map((item, key) => {
								return (
									<option
										key={key}
										value={item.imoveis_leis[0].numero}
									/>
								)
							})}
						</datalist>
					</div>
					<div className='col'>
						<input
							className='form-control'
							list='complemento'
							id='campo-complemento'
							placeholder='Complemento'
							name='complemento'
							onChange={handleChange}
							value={busca.complemento}
						/>
						<datalist id='complemento'>
							{asArray.map((item, key) => {
								return (
									<option
										key={key}
										value={item.imoveis_leis[0].complemento}
									/>
								)
							})}
						</datalist>
					</div>
					<div className='col-1'>
						<input
							className='form-control'
							list='bairro'
							id='campo-bairro'
							placeholder='Bairro'
							name='bairro'
							onChange={handleChange}
							value={busca.bairro}
						/>
						<datalist id='bairro'>
							{asArray.map((item, key) => {
								return (
									<option
										key={key}
										value={item.imoveis_leis[0].bairro}
									/>
								)
							})}
						</datalist>
					</div>
					<div className='col-2'>
						<input
							className='form-control'
							list='cidade'
							id='campo-cidade'
							placeholder='Cidade'
							name='cidade'
							onChange={handleChange}
							value={busca.cidade}
						/>
						<datalist id='cidade'>
							{asArray.map((item, key) => {
								return (
									<option
										key={key}
										value={item.imoveis_leis[0].cidade}
									/>
								)
							})}
						</datalist>
					</div>
					<div className='col'>
						<select
							className='form-select'
							aria-label='Default select example'
							name='itens'
							onChange={handleItens}
						>
							<option selected value='15'>
								Itens por página
							</option>
							<option value={Number.parseInt(10)}>10</option>
							<option value={20}>20</option>
							<option value={30}>30</option>
							<option value={40}>40</option>
							<option value={50}>50</option>
							<option value={60}>60</option>
						</select>
					</div>
					<div className='col'>
						<button
							className='btn btn-primary'
							type='button'
							onClick={() => callback()}
						>
							Limpar busca
						</button>
					</div>
				</div>
			</form>
			{busca === '' ? (
				<>Nada por aqui</>
			) : (
				<div>
					<div className='m-5 text-center'>
						<h3>Itens encontrados: {itensFiltrados.length}</h3>
					</div>
					<table className='table'>
						<thead>
							<tr className='table-light'>
								<th scope='col'>#</th>
								<th scope='col'>Pasta</th>
								<th scope='col'>
									Nome{' '}
									{/* <button
									className='bi bi-arrow-down-up'
									onClick={() =>
										setOrdemAlfabetica((prev) => !prev)
									}
								></button> */}
								</th>
								<th scope='col'>Endreço</th>
								<th scope='col'>Nº</th>
								<th scope='col'>Complemento</th>
								<th scope='col'>Bairro</th>
								<th scope='col'>Cidade</th>
								<th scope='col'>UF</th>
								<th
									scope='col'
									data-bs-toggle='tooltip'
									data-bs-placement='top'
									title='Escritura'
								>
									Esc
								</th>
								<th
									scope='col'
									data-bs-toggle='tooltip'
									data-bs-placement='top'
									title='Hipoteca'
								>
									Hip
								</th>
								<th scope='col'>Total</th>
								<th scope='col'>
									<p className='' style={{ color: 'red' }}>
										<i
											className='bi bi-exclamation-triangle-fill'
											style={{ fontSize: 18 }}
										></i>
									</p>
								</th>
								<th scope='col'>
									<p className='' style={{ color: 'grey' }}>
										<i
											className='bi bi-patch-exclamation-fill'
											style={{ fontSize: 18 }}
										></i>
									</p>
								</th>
								<th scope='col'>
									<div
										className=''
										style={{ color: 'green' }}
									>
										<i
											className='bi bi-patch-check-fill'
											style={{ fontSize: 18 }}
										></i>
									</div>
								</th>
							</tr>
						</thead>
						<tbody>
							{currentTableData.map((data, key) => {
								return (
									<tr key={key}>
										<th scope='row'>{data.id}</th>
										<td>{data.rotulo}</td>
										{/*  Link nomes */}
										<td>
											<Link to={`/detalhes/${data.id}`}>
												{data.nome}
											</Link>
										</td>
										<td>
											{data.imoveis_leis.length === 0 ? (
												<p>-----</p>
											) : (
												data.imoveis_leis[0].end
											)}
										</td>
										<td>
											{data.imoveis_leis.length === 0 ? (
												<p>-----</p>
											) : (
												data.imoveis_leis[0].numero
											)}
										</td>
										<td>
											{data.imoveis_leis.length === 0 ? (
												<p>-----</p>
											) : (
												data.imoveis_leis[0].complemento
											)}
										</td>
										<td>
											{data.imoveis_leis.length === 0 ? (
												<p>-----</p>
											) : (
												data.imoveis_leis[0].bairro
											)}
										</td>
										<td>
											{data.imoveis_leis.length === 0 ? (
												<p>-----</p>
											) : (
												data.imoveis_leis[0].cidade
											)}
										</td>
										<td>
											{data.imoveis_leis.length === 0 ? (
												<p>-----</p>
											) : (
												data.imoveis_leis[0].uf
											)}
										</td>
										<td>
											{data.imoveis_leis.length !== 0 &&
												(data.imoveis_leis[0]
													.escritura === 1 ? (
													<i className='ms-3 bi disponivel bi-file-earmark-text'></i>
												) : (
													<i className='ms-3 bi indisponivel bi-file-earmark-text'></i>
												))}
										</td>
										<td>
											{data.imoveis_leis.length !== 0 &&
												(data.imoveis_leis[0]
													.hipoteca === 1 ? (
													<i className='ms-2 bi disponivel bi-house'></i>
												) : (
													<i className='ms-2 bi indisponivel bi-house'></i>
												))}
										</td>
										<td>{data.documentos_leis.length}</td>
										<td>
											{
												data.documentos_leis.filter(
													(item) =>
														item.status === '0'
												).length
											}
										</td>
										<td>
											{
												data.documentos_leis.filter(
													(item) =>
														item.status === '10'
												).length
											}
										</td>
										<td>
											{
												data.documentos_leis.filter(
													(item) =>
														item.status === '3'
												).length
											}
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
					<Pagination
						className='pagination-bar justify-content-center mt-3'
						currentPage={currentPage}
						totalCount={itensFiltrados.length}
						pageSize={itensPorPagina.itens}
						onPageChange={(page) => setCurrentPage(page)}
					/>
				</div>
			)}
		</div>
	)
}

export default FiltroMutuarioLei

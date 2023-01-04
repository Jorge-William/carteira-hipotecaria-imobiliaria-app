import Pagination from '../components/Pagination'
import { useState, useEffect, useMemo } from 'react'
import SkeletonTabela from '../components/SkeletonTabela'
import axios from 'axios'
import acertoData from '../helpers/acertoData'

const Atividades = () => {
	const [lista, setLista] = useState([])
	// const [isLoading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [itensPorPagina, setItensPorPagina] = useState({ itens: 15 })
	const [busca, setBusca] = useState({
		name: '',
		date: ''
	})
	console.log(lista)
	useEffect(() => {
		setTimeout(() => {
			return axios
				.get('/atividades')
				.then((response) => response.data)
				.then((dados) => setLista(dados))
			// setLoading(false)
		}, 1000)
	}, [])

	const callback = () => {
		setBusca({
			name: '',
			date: ''
			// complemento: '',
			// bairro: '',
			// rotulo: '',
			// end: '',
			// cidade: '',
			// numero: ''
		})
		setCurrentPage(1)
		setItensPorPagina({ itens: 15 })
	}

	// const asArray = Object.entries(data)[0][1][0]

	useEffect(() => {
		// console.log('OIIIIII JORGE')
	}, [busca])

	const lowercaseName = busca.name.toLowerCase()

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

	const itensFiltrados = lista.filter((item) => {
		return item.name.toLowerCase().includes(lowercaseName)
	})

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * itensPorPagina.itens
		const lastPageIndex = firstPageIndex + itensPorPagina.itens
		return itensFiltrados.slice(firstPageIndex, lastPageIndex)
	}, [currentPage, itensPorPagina, itensFiltrados])

	return lista.length === 0 ? (
		<>
			<h4 className='mt-5 mb-5 text-center'>Aguardando dados...</h4>
			<SkeletonTabela />
		</>
	) : (
		<>
			<h1>Log de atividades</h1>
			<section className='mt-5'>
				<div className='row mb-5'>
					<div className='col-md-4'>
						<input
							className='form-control'
							list='rotulo'
							id='campo-nome'
							placeholder='Nome do Operador'
							onChange={handleChange}
							name='name'
							value={busca.name}
						/>
						<datalist id='nome'>
							{lista.map((item, key) => {
								return <option key={key} value={item.name} />
							})}
						</datalist>
					</div>
					{/* <div className='col-md-2'>
						<input
							type='date'
							className='form-control'
							id='campo-date'
							onChange={handleChange}
							name='date'
							// value={busca.rotulo}
						/>
					</div> */}
					<div className='col-md-2'>
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
				<div className='table-responsive'>
					<table className='table table-hover align-middle'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Data</th>
								<th scope='col'>Usuario</th>
								<th scope='col'>Tabela</th>
								<th scope='col'>Operação</th>
							</tr>
						</thead>
						<tbody className='text-secondary'>
							{currentTableData?.map((dado, key) => (
								<tr key={key}>
									<th scope='row'>{dado.id}</th>
									{/* <td>
                                <Link to={`/detalhes-auditoria/${dado.id}`}>
                                    {dado.nome}
                                </Link>
                            </td> */}
									<td>{acertoData(dado.data)}</td>
									<td>{dado.name}</td>
									<td>{dado.tabela}</td>
									<td>{dado.operacao}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<Pagination
					className='pagination-bar justify-content-center mt-3'
					currentPage={currentPage}
					totalCount={lista.length}
					pageSize={itensPorPagina.itens}
					onPageChange={(page) => setCurrentPage(page)}
				/>
			</section>
		</>
	)
}

export default Atividades

import Pagination from './Pagination'
import { useEffect, useState, useMemo } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import SkeletonTabela from './SkeletonTabela'
import AdicionaTipoLei from '../components/AdicionaTipoLei'
import FilterTipoDocLei from './FilterTipoDocLei'
import '../style/TabelaTipoDocumento.css'

// import ModalTelaOperador from './ModalTelaOperador'

const TabelaTipoDocumentoLei = () => {
	const [lista, setLista] = useState([])
	// const [isLoading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	// const [modalData, setModalData] = useState([])
	const [reloadTabela, setReloadTabela] = useState({ reload: false })

	// const [isLoading, setLoading] = useState(true)

	const [alternateCompon, setAlternateCompon] = useState(false)
	const [itensPorPagina, setItensPorPagina] = useState({ itens: 15 })

	const handleItens = (event) => {
		const value = event.target.value
		const name = event.target.name

		setItensPorPagina({ ...itensPorPagina, [name]: value })
	}

	useEffect(() => {
		setTimeout(() => {
			return axios
				.get('/tipos-documentos-lei')
				.then((response) => response.data)
				.then((dados) => setLista(dados))
			// setLoading(false)
		}, 1000)
	}, [reloadTabela])

	// const setLoad = () => {
	// 	setReloadTabela({ reload: true })
	// }

	const currentTableData = useMemo(() => {
		const firstPageIndex =
			(currentPage - 1) * Number.parseInt(itensPorPagina.itens)
		const lastPageIndex =
			firstPageIndex + Number.parseInt(itensPorPagina.itens)
		return lista.slice(firstPageIndex, lastPageIndex)
	}, [currentPage, lista, itensPorPagina])

	const callback = () => {
		console.log('foi callback')
		setAlternateCompon((prev) => !prev)
		setReloadTabela((prev) => !prev)
	}

	const callbackFilter = () => {
		setReloadTabela((prev) => !prev)
	}

	return lista.length === 0 ? (
		<>
			<h4 className='mt-5 mb-5 text-center'>Aguarde o carregamento...</h4>
			<SkeletonTabela />
		</>
	) : (
		<section className='mt-5'>
			{alternateCompon ? (
				<></>
			) : (
				<FilterTipoDocLei
					tiposDoc={lista}
					callbackFilter={callbackFilter}
				/>
			)}
			<button
				className='btn btn-outline-success mb-5'
				type='button'
				onClick={(prev) => setAlternateCompon((prev) => !prev)}
			>
				{!alternateCompon ? 'Adicionar tipo' : 'Voltar'}
			</button>

			{alternateCompon ? (
				<>
					<AdicionaTipoLei callback={callback} />
				</>
			) : (
				<>
					<hr />
					<br />
					<div className='container-fluid'>
						<div className='row justify-content-md-center'>
							<div className='card-qtd col-2'>
								<div className='p-3 '>
									<h4>Total de registros: {lista.length}</h4>
								</div>
							</div>
							<div className='col-2'>
								<select
									className='form-select input-itens-por-pagina'
									aria-label='Default select example'
									name='itens'
									onChange={handleItens}
								>
									<option selected value='15'>
										Itens por página
									</option>
									<option value={Number.parseInt(10)}>
										10
									</option>
									<option value={20}>20</option>
									<option value={30}>30</option>
									<option value={40}>40</option>
									<option value={50}>50</option>
									<option value={60}>60</option>
								</select>
							</div>
						</div>
					</div>
					<table className='table table-hover align-middle table-responsive-md mt-5'>
						<thead>
							<tr>
								<th scope='col'>#</th>
								<th scope='col'>Tipo</th>
								<th scope='col'>Abreviação</th>
								<th scope='col'>Descrição</th>
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
									<td>{dado.tipo}</td>

									<td>{dado.abreviacao}</td>
									<td>{dado.descricao}</td>
								</tr>
							))}
						</tbody>
					</table>
					<Pagination
						className='pagination-bar justify-content-center mt-3'
						currentPage={currentPage}
						totalCount={lista.length}
						pageSize={itensPorPagina.itens}
						onPageChange={(page) => setCurrentPage(page)}
					/>
				</>
			)}
			{/* <!-- Modal --> */}
			{/* <ModalTelaOperador infoDoc={modalData} callback={() => setLoad()} /> */}
		</section>
	)
}

export default TabelaTipoDocumentoLei

import Pagination from './Pagination'
import { useEffect, useState, useMemo } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import SkeletonTabela from './SkeletonTabela'
import acertoData from '../helpers/acertoData'
// import ModalTelaOperador from './ModalTelaOperador'
import ModalTelaOperadorSfh from './ModalTelaOperadorSfh'

const TabelaOperadorSfh = () => {
	const [lista, setLista] = useState([])
	// const [isLoading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [modalData, setModalData] = useState([])
	const [reloadTabela, setReloadTabela] = useState({ reload: false })

	console.log(lista)

	useEffect(() => {
		setTimeout(() => {
			return axios
				.get('/tabela-operador-sfh')
				.then((response) => response.data)
				.then((dados) => setLista(dados))
			// setLoading(false)
		}, 1000)
	}, [reloadTabela])

	const PageSize = 15

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize
		const lastPageIndex = firstPageIndex + PageSize
		return lista.slice(firstPageIndex, lastPageIndex)
	}, [currentPage, lista])

	const handleClick = (id, tipo) => {
		setTimeout(() => {
			return (
				axios
					.post('/retorna-id-mutuario-sfh', {
						// id do documento
						id
					})
					.then((response) => response.data)
					// .then(() => {
					// 	setModalData(tipo)
					// })
					.then((dados) => setModalData({ dados, tipo }))
			)
			// setLoading(false)
		}, 1000)
	}

	const setLoad = () => {
		setReloadTabela({ reload: true })
	}

	return lista.length === 0 ? (
		<>
			<h4 className='mt-5 mb-5 text-center'>
				Não há documentos pendentes
			</h4>
			<SkeletonTabela />
		</>
	) : (
		<section className='mt-5'>
			<table className='table table-hover align-middle table-responsive-md'>
				<thead>
					<tr>
						<th scope='col'>#</th>
						<th scope='col'>Pasta</th>
						<th scope='col'>ID do Doc.</th>
						<th scope='col'>Tipo Doc.</th>
						<th scope='col'>Data audição</th>
						<th scope='col'>Auditor</th>
						<th scope='col'>Observação</th>
						<th scope='col'>Nome do mut.</th>
						<th scope='col'>Ordem das pág.</th>
						<th scope='col'>Natureza do doc.</th>
						<th scope='col'>Alinhamento</th>
						<th scope='col'>Legibilidade</th>
						<th scope='col'>N° páginas</th>
						<th scope='col'>Faltou verso</th>
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
							<td>{dado.cod_pasta}</td>
							<td>
								<button
									className='btn btn-outline-success'
									data-bs-toggle='modal'
									data-bs-target='#modalOperadorSfh'
									onClick={() =>
										handleClick(
											dado.doc_id,
											dado.tipo_documento
										)
									}
								>
									{dado.doc_id}
								</button>
							</td>
							<td>{dado.tipo_documento}</td>
							<td>{acertoData(dado.dt_auditoria)}</td>
							<td>{dado.auditado_por}</td>
							<td>{dado.obs}</td>
							<td>
								{dado.nome_mutuario === 'false' ? (
									<i
										className='bi bi-check-square-fill'
										style={{ color: 'red' }}
									></i>
								) : (
									<i
										className='bi bi-check-square-fill'
										style={{ color: 'green' }}
									></i>
								)}
							</td>
							<td>
								{dado.ordem_pag === 'false' ? (
									<i
										className='bi bi-check-square-fill'
										style={{ color: 'red' }}
									></i>
								) : (
									<i
										className='bi bi-check-square-fill'
										style={{ color: 'green' }}
									></i>
								)}
							</td>
							<td>
								{dado.natureza_doc === 'false' ? (
									<i
										className='bi bi-check-square-fill'
										style={{ color: 'red' }}
									></i>
								) : (
									<i
										className='bi bi-check-square-fill'
										style={{ color: 'green' }}
									></i>
								)}
							</td>
							<td>
								{dado.alinhamento === 'false' ? (
									<i
										className='bi bi-check-square-fill'
										style={{ color: 'red' }}
									></i>
								) : (
									<i
										className='bi bi-check-square-fill'
										style={{ color: 'green' }}
									></i>
								)}
							</td>
							<td>
								{dado.legibilidade === 'false' ? (
									<i
										className='bi bi-check-square-fill'
										style={{ color: 'red' }}
									></i>
								) : (
									<i
										className='bi bi-check-square-fill'
										style={{ color: 'green' }}
									></i>
								)}
							</td>
							<td>
								{dado.qtd_pag === 'false' ? (
									<i
										className='bi bi-check-square-fill'
										style={{ color: 'red' }}
									></i>
								) : (
									<i
										className='bi bi-check-square-fill'
										style={{ color: 'green' }}
									></i>
								)}
							</td>
							<td>
								{dado.scan_verso === 'false' ? (
									<i
										className='bi bi-check-square-fill'
										style={{ color: 'red' }}
									></i>
								) : (
									<i
										className='bi bi-check-square-fill'
										style={{ color: 'green' }}
									></i>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Pagination
				className='pagination-bar justify-content-center mt-3'
				currentPage={currentPage}
				totalCount={lista.length}
				pageSize={PageSize}
				onPageChange={(page) => setCurrentPage(page)}
			/>
			<ModalTelaOperadorSfh
				infoDoc={modalData}
				callback={() => setLoad()}
			/>
		</section>
	)
}

export default TabelaOperadorSfh

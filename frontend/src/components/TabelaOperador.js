import Pagination from './Pagination'
import { useEffect, useState, useMemo } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import acertoData from '../helpers/acertoData'
import SkeletonTabela from '../components/SkeletonTabela'
import ModalTelaOperador from './ModalTelaOperador'

const TabelaOperador = () => {
	const [lista, setLista] = useState([])
	// const [isLoading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [modalData, setModalData] = useState([])

	useEffect(() => {
		setTimeout(() => {
			return axios
				.get('/tabela-operador')
				.then((response) => response.data)
				.then((dados) => setLista(dados))
			// setLoading(false)
		}, 1000)
	}, [])

	const handleClick = (id) => {
		setTimeout(() => {
			return axios
				.post('/retorna-id-mutuario', {
					id
				})
				.then((response) => response.data)
				.then((dados) => setModalData(dados))
			// setLoading(false)
		}, 1000)
	}

	const PageSize = 15

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize
		const lastPageIndex = firstPageIndex + PageSize
		return lista.slice(firstPageIndex, lastPageIndex)
	}, [currentPage, lista])

	return lista.length === 0 ? (
		<>
			<h4 className='mt-5 mb-5 text-center'>
				Não há documentos pendentes
			</h4>
			<SkeletonTabela />
		</>
	) : (
		<section className='mt-5'>
			<table class='table table-hover align-middle table-responsive-md'>
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
								<td>
									<button
										className='btn btn-outline-success'
										data-bs-toggle='modal'
										data-bs-target='#modalOperador'
										onClick={() => handleClick(dado.doc_id)}
									>
										{dado.doc_id}
									</button>
								</td>
							</td>
							<td>{dado.tipo_documento}</td>

							<td>{acertoData(dado.dt_auditoria)}</td>
							<td>{dado.auditado_por}</td>
							<td>{dado.obs}</td>
							<td>
								{dado.nome_mutuario === 'false' ? (
									<i
										class='bi bi-check-square-fill'
										style={{ color: 'red' }}
									></i>
								) : (
									<i
										class='bi bi-check-square-fill'
										style={{ color: 'green' }}
									></i>
								)}
							</td>
							<td>
								{dado.ordem_pag === 'false' ? (
									<i
										class='bi bi-check-square-fill'
										style={{ color: 'red' }}
									></i>
								) : (
									<i
										class='bi bi-check-square-fill'
										style={{ color: 'green' }}
									></i>
								)}
							</td>
							<td>
								{dado.natureza_doc === 'false' ? (
									<i
										class='bi bi-check-square-fill'
										style={{ color: 'red' }}
									></i>
								) : (
									<i
										class='bi bi-check-square-fill'
										style={{ color: 'green' }}
									></i>
								)}
							</td>
							<td>
								{dado.alinhamento === 'false' ? (
									<i
										class='bi bi-check-square-fill'
										style={{ color: 'red' }}
									></i>
								) : (
									<i
										class='bi bi-check-square-fill'
										style={{ color: 'green' }}
									></i>
								)}
							</td>
							<td>
								{dado.legibilidade === 'false' ? (
									<i
										class='bi bi-check-square-fill'
										style={{ color: 'red' }}
									></i>
								) : (
									<i
										class='bi bi-check-square-fill'
										style={{ color: 'green' }}
									></i>
								)}
							</td>
							<td>
								{dado.qtd_pag === 'false' ? (
									<i
										class='bi bi-check-square-fill'
										style={{ color: 'red' }}
									></i>
								) : (
									<i
										class='bi bi-check-square-fill'
										style={{ color: 'green' }}
									></i>
								)}
							</td>
							<td>
								{dado.scan_verso === 'false' ? (
									<i
										class='bi bi-check-square-fill'
										style={{ color: 'red' }}
									></i>
								) : (
									<i
										class='bi bi-check-square-fill'
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
			{/* <!-- Modal --> */}
			<ModalTelaOperador infoDoc={modalData} />
		</section>
	)
}

export default TabelaOperador

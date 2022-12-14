import Pagination from '../components/Pagination'
import { useState, useEffect, useMemo } from 'react'
import SkeletonTabela from '../components/SkeletonTabela'
import axios from 'axios'
import acertoData from '../helpers/acertoData'

const Atividades = () => {
	const [lista, setLista] = useState([])
	// const [isLoading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
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

	const PageSize = 15

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize
		const lastPageIndex = firstPageIndex + PageSize
		return lista.slice(firstPageIndex, lastPageIndex)
	}, [currentPage, lista])

	return lista.length === 0 ? (
		<>
			<h4 className='mt-5 mb-5 text-center'>Aguardando dados...</h4>
			<SkeletonTabela />
		</>
	) : (
		<>
			<h1>Log de atividades</h1>
			<section className='mt-5'>
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
					pageSize={PageSize}
					onPageChange={(page) => setCurrentPage(page)}
				/>
			</section>
		</>
	)
}

export default Atividades

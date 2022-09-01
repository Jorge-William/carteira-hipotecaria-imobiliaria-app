import { useState, useEffect, useMemo } from 'react'
import { getDocsNaoAuditados } from '../services/getDocumentos.service'
import TableFilterAuditoria from './TableFilterAuditoria'
import Pagination from './Pagination'
import { Link } from 'react-router-dom'

let PageSize = 15

export default function TableAuditoria() {
	const [lista, setLista] = useState([])
	const [isLoading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		setTimeout(() => {
			getDocsNaoAuditados().then((dados) => setLista(dados))
			setLoading(false)
		}, 1000)
	}, [])

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize
		const lastPageIndex = firstPageIndex + PageSize
		return lista.slice(firstPageIndex, lastPageIndex)
	}, [currentPage, lista])

	return (
		<section>
			<TableFilterAuditoria data={lista} />
			<table class='table table-hover align-middle'>
				<thead>
					<tr>
						<th scope='col'>#</th>
						<th scope='col'>Rotulo</th>
						<th scope='col'>Nome</th>
						<th scope='col'>Documentos</th>
					</tr>
				</thead>
				<tbody className='text-secondary'>
					{currentTableData?.map((dado, key) => (
						<tr key={key}>
							<th scope='row'>{dado.id}</th>
							<td>{dado.rotulo}</td>
							<td>
								<Link to={`/detalhes-auditoria/${dado.id}`}>
									{dado.nome}
								</Link>
							</td>
							<td>{dado.nome}</td>
							<td>{dado.nao_auditados}</td>
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
		</section>
	)
}

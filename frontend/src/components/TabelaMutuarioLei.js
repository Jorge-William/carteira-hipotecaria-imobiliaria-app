import React from 'react'
import getMutuariosLei from '../services/getMutuarios.service'
import { useEffect, useState, useMemo } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Pagination from './Pagination'
import '../style/Pagination.scss'

let PageSize = 20

const TabelaMutuarioLei = () => {
	const [mutLeiData, setMutLeiData] = useState([])
	const [isLoading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)

	const fetchMutuarios = () => {
		getMutuariosLei().then((mutuario) => setMutLeiData(mutuario))
		setLoading(false)
	}
	useEffect(() => {
		console.log('Carregou!')
		setTimeout(() => {
			fetchMutuarios()
		}, 5000)
	}, [])

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize
		const lastPageIndex = firstPageIndex + PageSize
		return mutLeiData.slice(firstPageIndex, lastPageIndex)
	}, [currentPage, mutLeiData])

	return isLoading ? (
		<Skeleton count={20} />
	) : (
		<div>
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
					{currentTableData?.map((data) => {
						return (
							<tr key={data.id}>
								<th scope='row'>{data.id}</th>
								<td>{data.rotulo}</td>
								<td>{data.nome}</td>
								<td>{data.imoveis_leis[0].end}</td>
								<td>{data.imoveis_leis[0].numero}</td>
								<td>{data.imoveis_leis[0].complemento}</td>
								<td>{data.imoveis_leis[0].bairro}</td>
								<td>{data.imoveis_leis[0].cidade}</td>
								<td>{data.imoveis_leis[0].uf}</td>
								<td>{data.imoveis_leis[0].escritura}</td>
								<td>{data.imoveis_leis[0].hipoteca}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<Pagination
				className='pagination-bar justify-content-center mt-5'
				currentPage={currentPage}
				totalCount={mutLeiData.length}
				pageSize={PageSize}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</div>
	)
}
export default TabelaMutuarioLei

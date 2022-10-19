import React from 'react'
import { getMutuariosSfh } from '../services/getMutuarios.service'
import { useEffect, useState, useMemo } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Pagination from './Pagination'
import '../style/Pagination.scss'
import '../style/TabelaMutuario.css'
import TableFilterSfh from './TableFilterSfh'
import { Link } from 'react-router-dom'

let PageSize = 15

const TabelaMutuarioSfh = () => {
	const [mutSfhData, setMutSfhData] = useState([])
	const [isLoading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const fetchMutuarios = () => {
		getMutuariosSfh().then((mutuario) => setMutSfhData(mutuario))
		setLoading(false)
	}
	useEffect(() => {
		// setTimeout(() => {
		fetchMutuarios()
		// }, 1000)
	}, [])

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize
		const lastPageIndex = firstPageIndex + PageSize
		return mutSfhData.slice(firstPageIndex, lastPageIndex)
	}, [currentPage, mutSfhData])

	return isLoading ? (
		<div>
			<section>
				<TableFilterSfh data={mutSfhData} />
			</section>
			<table className='table'>
				<thead>
					<tr>
						<th scope='col'>
							<Skeleton count={1} height={25} />
						</th>
						<th scope='col'>
							<Skeleton count={1} height={25} />
						</th>
						<th scope='col'>
							<Skeleton count={1} height={25} />
						</th>
						<th scope='col'>
							<Skeleton count={1} height={25} />
						</th>
						<th scope='col'>
							<Skeleton count={1} height={25} />
						</th>
						<th scope='col'>
							<Skeleton width height={25} />
						</th>
						<th scope='col'>
							<Skeleton count={1} height={25} />
						</th>
						<th scope='col'>
							<Skeleton count={1} height={25} />
						</th>
						<th scope='col'>
							<Skeleton count={1} height={25} />
						</th>
						<th scope='col'>
							<Skeleton count={1} height={25} />
						</th>

						<th
							scope='col'
							data-bs-toggle='tooltip'
							data-bs-placement='top'
							title='Escritura'
						>
							<Skeleton count={1} height={25} />
						</th>
						<th
							scope='col'
							data-bs-toggle='tooltip'
							data-bs-placement='top'
							title='Hipoteca'
						>
							<Skeleton count={1} height={25} />
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope='row'>
							<Skeleton count={15} height={25} />
						</th>
						<td>
							<Skeleton count={15} height={25} />
						</td>
						<td>
							<Skeleton count={15} height={25} />
						</td>
						<td>
							<Skeleton count={15} height={25} />
						</td>
						<td>
							<Skeleton count={15} height={25} />
						</td>
						<td>
							<Skeleton count={15} height={25} />
						</td>
						<td>
							<Skeleton count={15} height={25} />
						</td>
						<td>
							<Skeleton count={15} height={25} />
						</td>
						<td>
							<Skeleton count={15} height={25} />
						</td>
						<td>
							<Skeleton count={15} height={25} />
						</td>
						<td>
							<Skeleton count={15} height={25} />
						</td>
						<td>
							<Skeleton count={15} height={25} />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	) : (
		<div>
			<section>
				<TableFilterSfh data={mutSfhData} />
			</section>
			<table className='table table-hover'>
				<thead>
					<tr className='table-light'>
						<th scope='col'>#</th>
						<th scope='col'>Pasta</th>
						<th scope='col'>Nome</th>
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
					</tr>
				</thead>
				<tbody>
					{currentTableData?.map((data, key) => {
						return (
							<tr key={key}>
								<th scope='row'>{data.id}</th>
								<td>{data.rotulo}</td>
								{/*  Link nomes */}
								<td>
									<Link to={`/detalhes-sfh/${data.id}`}>
										{data.nome}
									</Link>
								</td>
								<td>
									{data.imoveis_sfhs.length === 0 ? (
										<p>-----</p>
									) : (
										data.imoveis_sfhs[0].end
									)}
								</td>
								<td>
									{data.imoveis_sfhs.length === 0 ? (
										<p>-----</p>
									) : (
										data.imoveis_sfhs[0].numero
									)}
								</td>
								<td>
									{data.imoveis_sfhs.length === 0 ? (
										<p>-----</p>
									) : (
										data.imoveis_sfhs[0].complemento
									)}
								</td>
								<td>
									{data.imoveis_sfhs.length === 0 ? (
										<p>-----</p>
									) : (
										data.imoveis_sfhs[0].bairro
									)}
								</td>
								<td>
									{data.imoveis_sfhs.length === 0 ? (
										<p>-----</p>
									) : (
										data.imoveis_sfhs[0].cidade
									)}
								</td>
								<td>
									{data.imoveis_sfhs.length === 0 ? (
										<p>-----</p>
									) : (
										data.imoveis_sfhs[0].uf
									)}
								</td>
								<td>
									{data.imoveis_sfhs.length !== 0 &&
										(data.imoveis_sfhs[0].escritura ===
										1 ? (
											<i className='ms-3 bi disponivel bi-file-earmark-text'></i>
										) : (
											<i className='ms-3 bi indisponivel bi-file-earmark-text'></i>
										))}
								</td>
								<td>
									{data.imoveis_sfhs.length !== 0 &&
										(data.imoveis_sfhs[0].hipoteca === 1 ? (
											<i className='ms-2 bi disponivel bi-house'></i>
										) : (
											<i className='ms-2 bi indisponivel bi-house'></i>
										))}
								</td>{' '}
							</tr>
						)
					})}
				</tbody>
			</table>
			<Pagination
				className='pagination-bar justify-content-center mt-3'
				currentPage={currentPage}
				totalCount={mutSfhData.length}
				pageSize={PageSize}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</div>
	)
}
export default TabelaMutuarioSfh

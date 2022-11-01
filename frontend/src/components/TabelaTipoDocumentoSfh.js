import Pagination from './Pagination'
import { useEffect, useState, useMemo } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import SkeletonTabela from './SkeletonTabela'
import FilterTipoDoc from './FilterTipoDoc'
// import ModalTelaOperador from './ModalTelaOperador'

const TabelaTipoDocumentoSfh = () => {
	const [lista, setLista] = useState([])
	// const [isLoading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	// const [modalData, setModalData] = useState([])
	const [reloadTabela, setReloadTabela] = useState({ reload: false })

	useEffect(() => {
		setTimeout(() => {
			return axios
				.get('/tipos-documentos-sfh')
				.then((response) => response.data)
				.then((dados) => setLista(dados))
			// setLoading(false)
		}, 1000)
	}, [reloadTabela])

	const setLoad = () => {
		setReloadTabela({ reload: true })
	}

	const PageSize = 15

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize
		const lastPageIndex = firstPageIndex + PageSize
		return lista.slice(firstPageIndex, lastPageIndex)
	}, [currentPage, lista])

	return lista.length === 0 ? (
		<>
			<h4 className='mt-5 mb-5 text-center'>Aguarde o carregamento...</h4>
			<SkeletonTabela />
		</>
	) : (
		<section className='mt-5'>
			<FilterTipoDoc tiposDoc={lista} />
			<table class='table table-hover align-middle table-responsive-md mt-5'>
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

							<td>{dado.abrev}</td>
							<td>{dado.descricao}</td>
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
			{/* <ModalTelaOperador infoDoc={modalData} callback={() => setLoad()} /> */}
		</section>
	)
}

export default TabelaTipoDocumentoSfh

import { useState, useEffect } from 'react'

const FilterTipoDoc = (props) => {
	const { tiposDoc } = props
	const [tipoDocArray, setTipoDocArray] = useState([
		{ id: '', descricao: '' }
	])
	const [valorBusca, setValorBusca] = useState({})
	// const [showtable, setShowTable] = useState(false)
	const [tableData, setTableData] = useState()

	useEffect(() => {
		setTipoDocArray(tiposDoc)
	}, [tiposDoc])

	const handleClick = () => {
		const result = tipoDocArray.find((item) => {
			return item.descricao === valorBusca
		})
		setTableData(result)
	}

	// useEffect(() => {
	// 	setTableData(tipoDocArray.find((item) => item.descricao === valorBusca))
	// }, [valorBusca, tipoDocArray])
	return (
		<div className='container-fluid text-center mb-4'>
			<div className='row mb-5 align-items-end'>
				<div className='col-md-8'>
					<input
						class='form-control'
						list='datalistOptions'
						id='exampleDataList'
						placeholder='Digite para buscar um tipo...'
						onChange={(e) => setValorBusca(e.target.value)}
					/>
					<datalist id='datalistOptions'>
						{tipoDocArray?.map((item, key) => {
							return <option key={key} value={item.descricao} />
						})}
					</datalist>
				</div>
				<div className='col-md-1 d-grid'>
					<button
						className='btn btn-primary d-grid'
						onClick={() => handleClick()}
					>
						Buscar
					</button>
				</div>
				<div className='col-md-2  d-grid'>
					<button
						className='btn btn-outline-success'
						onClick={() => console.log('oi')}
					>
						Adicionar um tipo
					</button>
				</div>
				{!tableData ? (
					<></>
				) : (
					<div className='col-md-12 mt-4 '>
						<hr />
						<table class='table table-hover table-borderless align-middle'>
							<thead>
								<tr>
									<th scope='col'>#ID</th>
									<th scope='col'>Tipo</th>
									<th scope='col'>Abreviação</th>
									<th scope='col'>Descrição</th>
								</tr>
							</thead>
							<tbody className='text-secondary'>
								<tr>
									<td>{tableData.id}</td>
									<td>{tableData.tipo}</td>
									<td>{tableData.abrev}</td>
									<td>{tableData.descricao}</td>
									<td>
										<button className='btn btn-outline-primary me-2'>
											Editar
										</button>
										<button className='btn btn-outline-danger'>
											Excluir
										</button>
									</td>
								</tr>
							</tbody>
						</table>
						<hr />
					</div>
				)}
			</div>
		</div>
	)
}

export default FilterTipoDoc

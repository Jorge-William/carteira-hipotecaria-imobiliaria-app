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
						type='button'
						className='btn btn-outline-success'
						data-bs-toggle='modal'
						data-bs-target='#adicionarTipo'
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
			<div
				class='modal fade'
				id='adicionarTipo'
				tabindex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'
			>
				<div class='modal-dialog modal-lg modal-dialog-centered'>
					<div class='modal-content'>
						<div class='modal-header'>
							<h1 class='modal-title fs-5' id='exampleModalLabel'>
								Adicionar um novo tipo
							</h1>
							<button
								type='button'
								class='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div class='modal-body'>
							<div className='row'>
								<div class=' col-md-4 mb-3'>
									<label
										for='exampleFormControlInput1'
										class='form-label'
									>
										Abreviação
									</label>
									<input
										type='text'
										class='form-control'
										id='exampleFormControlInput1'
									/>
								</div>
								<div class=' col-md-8 mb-3'>
									<label
										for='exampleFormControlInput1'
										class='form-label'
									>
										Descrição
									</label>
									<input
										type='text'
										class='form-control'
										id='exampleFormControlInput1'
									/>
								</div>
							</div>
						</div>
						<div class='modal-footer'>
							<button
								type='button'
								class='btn btn-secondary'
								data-bs-dismiss='modal'
							>
								Cancelar
							</button>
							<button type='button' class='btn btn-primary'>
								Salvar mudanças
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FilterTipoDoc

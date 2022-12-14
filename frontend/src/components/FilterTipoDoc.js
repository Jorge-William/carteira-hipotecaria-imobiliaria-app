import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import '../style/upperCase.css'

const FilterTipoDoc = (props) => {
	const { tiposDoc } = props
	const [tipoDocArray, setTipoDocArray] = useState([
		{ id: '', descricao: '' }
	])
	const [valorBusca, setValorBusca] = useState('0')
	// const [showtable, setShowTable] = useState(false)
	const [tableData, setTableData] = useState({
		id: '',
		tipo: '',
		abrev: '',
		descricao: ''
	})
	const [isEdit, setIsEdit] = useState(false)
	const [abrev, setAbrev] = useState({ abrev: '' })
	const [descricao, setDescricao] = useState({ descricao: '' })
	const [showTable, setShowTable] = useState(false)

	useEffect(() => {
		setShowTable(false)
	}, [valorBusca])

	const userData = JSON.parse(localStorage.getItem('userData'))
	const usuario_id = userData.id

	useEffect(() => {
		setTipoDocArray(tiposDoc)
	}, [tiposDoc])

	useEffect(() => {
		setAbrev(tableData.abrev)
		setDescricao(tableData.descricao)
	}, [isEdit, tableData])

	// const tipoMutuario = 'sfh'

	const handleClick = () => {
		const result = tipoDocArray.find((item) => {
			return item.descricao === valorBusca
			// return {id: '', tipo: '', abrev: '', descricao: ''}
		})
		console.log(result)
		if (result === undefined) {
			return setTableData({ id: '', tipo: '', abrev: '', descricao: '' })
		} else {
			setShowTable(true)
			// setValorBusca('')
			return setTableData(result)
		}
	}

	const handleDelete = (id) => {
		Swal.fire({
			title: 'Deseja deletar o tipo?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sim deletar',
			showLoaderOnConfirm: true,
			preConfirm: () => {
				return axios
					.post('/deletar-tipo', {
						params: {
							id,
							usuario_id,
							descricao: tableData.descricao
						}
					})
					.then((response) => {
						console.log(response)
						if (!response.data.result) {
							throw new Error()
						}
						props.callbackFilter()
						setTableData({
							id: '',
							tipo: '',
							abrev: '',
							descricao: ''
						})
						setShowTable(false)
						setValorBusca('0')
						return response
					})
					.catch((error) => {
						Swal.showValidationMessage(`Request failed: ${error}`)
					})
			},
			allowOutsideClick: () => !Swal.isLoading()
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					icon: 'success',
					title: 'O tipo de documento foi deletado!'
				})
			}
		})
	}
	const handleEdit = (id) => {
		Swal.fire({
			title: 'Deseja salvar as alterações do tipo?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sim salvar',
			showLoaderOnConfirm: true,
			preConfirm: () => {
				return axios
					.put('/editar-tipo', {
						params: {
							id,
							usuario_id,
							descricao,
							abrev
						}
					})
					.then((response) => {
						console.log(response)
						if (!response.data.result) {
							throw new Error()
						}
						props.callbackFilter()
						setTableData({ abrev: '', descricao: '' })
						setShowTable(false)
						setIsEdit(false)
						return response
					})
					.catch((error) => {
						Swal.showValidationMessage(`Request failed: ${error}`)
					})
			},
			allowOutsideClick: () => !Swal.isLoading()
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					icon: 'success',
					title: 'O tipo de documento foi editado com sucesso!'
				})
			}
		})
	}

	// useEffect(() => {
	// 	setTableData(tipoDocArray.find((item) => item.descricao === valorBusca))
	// }, [valorBusca, tipoDocArray])
	return (
		<div className='container-fluid text-center mb-4'>
			<div className='row mb-5 align-items-end'>
				<div className='col-md-8'>
					<input
						className='form-control'
						list='datalistOptionsSFH'
						id='exampleDataList'
						placeholder='Digite para buscar um tipo...'
						onChange={(e) => setValorBusca(e.target.value)}
					/>
					<datalist id='datalistOptionsSFH'>
						{tipoDocArray?.map((item, key) => {
							return <option key={key} value={item.descricao} />
						})}
					</datalist>
				</div>
				<div className='col-md-1 d-grid'>
					<button
						className='btn btn-primary d-grid'
						// disabled={valorBusca === '' ?true: false}
						onClick={() => handleClick()}
					>
						Buscar
					</button>
				</div>

				{isEdit && (
					<div className='col-md-12 mt-4 '>
						<hr />
						<table className='table table-hover table-borderless align-middle'>
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
									<td>
										<input
											size='10'
											className='form-control upper-case'
											placeholder={tableData.abrev}
											type='text'
											onChange={(e) =>
												setAbrev(
													e.target.value.toUpperCase()
												)
											}
										/>
									</td>
									<td>
										<input
											size='50'
											className='form-control upper-case'
											placeholder={tableData.descricao}
											type='text'
											onChange={(e) =>
												setDescricao(
													e.target.value.toUpperCase()
												)
											}
										/>
									</td>
									<td>
										<button
											className='btn btn-success me-2'
											onClick={() =>
												handleEdit(tableData.id)
											}
										>
											Salvar alterções
										</button>
										<button
											className='btn btn-secondary'
											onClick={() =>
												setIsEdit((prev) => !prev)
											}
										>
											Cancelar edição
										</button>
									</td>
								</tr>
							</tbody>
						</table>
						<hr />
					</div>
				)}

				{!isEdit && showTable ? (
					<div className='col-md-12 mt-4 '>
						<hr />
						<table className='table table-hover table-borderless align-middle'>
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
										<button
											className='btn btn-outline-primary me-2'
											onClick={() =>
												setIsEdit((prev) => !prev)
											}
										>
											Editar
										</button>
										<button
											className='btn btn-outline-danger'
											onClick={() =>
												handleDelete(tableData.id)
											}
										>
											Excluir
										</button>
									</td>
								</tr>
							</tbody>
						</table>
						<hr />
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	)
}

export default FilterTipoDoc

import { useState, useEffect } from 'react'

const SelectInput = (props) => {
	const { tipoDoc } = props
	const [tipoDocArray, setTipoDocArray] = useState([
		{ id: '', descricao: '' }
	])

	useEffect(() => {
		const handleState = async () => {
			await setTipoDocArray(tipoDoc)
		}

		handleState()
	}, [tipoDoc])

	return (
		<>
			{/* <select
				className='form-select'
				aria-label='Default select example'
				onChange={(e) => props.callback(e.target.value)}
			>
				<option selected>Selecione uma opção</option>
				{tipoDocArray?.map((item, key) => {
					return (
						<option key={key} value={item.id}>
							{item.descricao}
						</option>
					)
				})}
			</select> */}
			{/* <label for='exampleDataList' class='form-label'>
				Datalist example
			</label> */}
			<input
				class='form-control'
				list='datalistOptions'
				id='exampleDataList'
				placeholder='Digite para buscar um tipo...'
				onChange={(e) => props.callback(e.target.value)}
			/>
			<datalist id='datalistOptions'>
				{tipoDocArray?.map((item, key) => {
					return <option key={key} value={item.descricao} />
				})}
			</datalist>
		</>
	)
}

export default SelectInput

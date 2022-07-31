import { useState, useEffect } from 'react'

const SelectInput = (props) => {
	const { tipoDoc } = props
	// console.log(props)
	const [tipoDocArray, setTipoDocArray] = useState([
		{ id: '', descricao: '' }
	])

	useEffect(() => {
		const handleState = async () => {
			await setTipoDocArray(tipoDoc)
		}

		handleState()
	}, [tipoDoc])

	// console.log(tipoDocArray)

	return (
<>
			<select class='form-select' aria-label='Default select example' onChange={(e) => props.callback(e.target.value) }>
				<option selected>Selecione uma opção</option>
				{tipoDocArray?.map((item, key) => {
					return (
						<option key={key} value={item.id}>
							{item.descricao}
						</option>
					)
				})}
			</select>
		</>
	)
}

export default SelectInput

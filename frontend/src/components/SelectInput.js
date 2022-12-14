import { useState, useEffect } from 'react'

const SelectInput = (props) => {
	const { tipoDoc, tipo } = props
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
			{/* <label for='exampleDataList' className='form-label'>
				Datalist example
			</label> */}
			<input
				className='form-control'
				list='datalistOptions'
				id='exampleDataList'
				placeholder='Digite a abrevição do documento...'
				onChange={(e) => props.callback(e.target.value)}
			/>
			{tipo === 'lei' ? (
				<datalist id='datalistOptions'>
					{tipoDocArray?.map((item, key) => {
						return <option key={key} value={item.abreviacao} />
					})}
				</datalist>
			) : (
				<datalist id='datalistOptions'>
					{tipoDocArray?.map((item, key) => {
						return <option key={key} value={item.abrev} />
					})}
				</datalist>
			)}
		</>
	)
}

export default SelectInput

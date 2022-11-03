import axios from 'axios'
import { useState } from 'react'
import Swal from 'sweetalert2'
import '../style/upperCase.css'

const AdicionaTipoLei = ({ callback }) => {
	const [createData, setCreateData] = useState({
		abreviacao: '',
		descricao: ''
	})

    const userData = JSON.parse(localStorage.getItem('userData'))
    const usuario_id = userData.id

	const handleChange = (event) => {
		const value = event.target.value.toUpperCase()
		const name = event.target.name
		setCreateData({ ...createData, [name]: value })
	}

	const { descricao, abreviacao } = createData

	const handleClick = () => {
		if (createData.abreviacao === '' || createData.descricao === '') {
			Swal.fire({
				icon: 'warning',
				title: 'Atenção',
				text: 'Preencha todos os campos'
			})
		} else {
			Swal.fire({
				title: 'Deseja salvar o tipo?',
				icon: 'question',
				showCancelButton: true,
				confirmButtonText: 'Salvar tipo',
				showLoaderOnConfirm: true,
				preConfirm: () => {
					return axios
						.put('/adicionar-tipo-lei', {
							abreviacao,
							descricao, 
                            usuario_id
						})
						.then((response) => {
                            console.log(response)
							if (!response.data.result) {
								throw new Error('A pasta')
							}
							callback()
							return response
						})
						.catch((error) => {
							Swal.showValidationMessage(
								`Request failed: ${error}`
							)
						})
				},
				allowOutsideClick: () => !Swal.isLoading()
			}).then((result) => {
				if (result.isConfirmed) {
					Swal.fire({
						icon: 'success',
						title: 'Tipo salvo'
					})
				}
			})
		}
	}

	return (
		<div className='container'>
			<div className='row align-items-end'>
				<div class=' col-md-1 mb-3'>
					<label for='exampleFormControlInput1' class='form-label'>
						Abreviação
					</label>
					<input
						name='abreviacao'
						type='text'
						className='form-control upper-case'
						id='exampleFormControlInput1'
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div className=' col-md-8 mb-3'>
					<label for='exampleFormControlInput1' class='form-label'>
						Descrição
					</label>
					<input
						name='descricao'
						type='text'
						className='form-control upper-case'
						id='exampleFormControlInput1'
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div className=' col-md-3 mb-3'>
					<button
						className='btn btn-primary'
						type='button'
						onClick={() => handleClick()}
					>
						{' '}
						Salvar tipo
					</button>
				</div>
			</div>
		</div>
	)
}

export default AdicionaTipoLei

import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
// import Skeleton from 'react-loading-skeleton'

const ButtonAdicionarOperador = ({callback}) => {
	const [mostraForm, setMostraForm] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		lastName: '',
		email: '',
		type: ''
	})

useEffect(() => {console.log('recarregou!!')},[formData])

	const handleChange = (event) => {
		const value = event.target.value

		setFormData({ ...formData, [event.target.name]: value })
	}

	const authorization = JSON.parse(localStorage.getItem('userData'))

	// console.log(authorization.token)

	const handleClick = () => {
		Swal.fire({
			icon: 'warning',
			title: 'Atenção',
			text: `Deseja realmente salvar o operador ${formData.name}?`,
			showCancelButton: true,
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Sim Salvar',
			showLoaderOnConfirm: true,
			preConfirm: () => {
				return axios
					.post('/criar-usuario', {
						params: {
							formData
						},
						headers: {
							authorization
						}
					})
					.then((response) => {
					// 	console.log(response)
					callback()
					setMostraForm((prev) => !prev)
						if (!response.statusText === 'OK') {
							throw new Error(response.statusText)
						}
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
					title: 'Operador criado com sucesso!'
				})
			}
		})
	}

	return (
		<section className='mt-5 mb-5'>
			<button
				className='btn btn-primary'
				style={{ width: 70, height: 70 }}
				onClick={() => setMostraForm((prev) => !prev)}
			>
				<i class='bi bi-person-plus' style={{ fontSize: 30 }}></i>
			</button>

			{mostraForm && (
				<div className='row mt-5'>
					<div className='col-md-3'>
						<input
							placeholder='Nome'
							type='text'
							name='name'
							onChange={handleChange}
							className='form-control'
						/>
					</div>
					<div className='col-md-3'>
						<input
							placeholder='Sobrenome'
							type='text'
							name='lastName'
							onChange={handleChange}
							className='form-control'
						/>
					</div>
					<div className='col-md-3'>
						<input
							placeholder='E-mail'
							type='email'
							name='email'
							onChange={handleChange}
							required
							className='form-control'
						/>
					</div>
					<div className='col-md-2'>
						<select
							className='form-select'
							aria-label='Default select example'
							name='type'
							onChange={handleChange}
						>
							<option dafeultValue>Selecione uma opção</option>
							<option value='operador'>Operador</option>
							<option value='administrador'>Administrador</option>
							<option value='auditor'>Auditor</option>
						</select>
					</div>
					<div className='col-md-1'>
						<button
							disabled={formData.name === '' || formData.lastName === '' || formData.email === '' || formData.type === '' ? true : false}
							type='submit'
							className='btn btn-success'
							onClick={() => handleClick()}
						>
							Salvar
						</button>
					</div>
				</div>
			)}
		</section>
	)
}

export default ButtonAdicionarOperador

import axios from 'axios'
import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import Swal from 'sweetalert2'

const ModalEditarUsuario = ({ user, uuid, callback}) => {
	const [userData, setUserData] = useState()
    const [usuario, setUsuario] = useState({id: '', name:'', lasName:'', email: '', type: ''})
    const [novosDados, setNovosDados] = useState({id: usuario.id, name: usuario.name, lasName: usuario.name, email: usuario.email , type: usuario.type})

	useEffect(() => {
		setUserData(user)
	}, [userData, user])
	// console.log(user);

	const getUser = (id) => {
		axios.post('/usuario-modal', { params: { id }}).then(response => setUsuario(response.data))
	}

	useEffect(() => {
		getUser(user.id_operador)
	},[user.id_operador])

	// console.log(user, uuid)

	const handleChange = (event) => {
		const value = event.target.value
		setNovosDados({...usuario, [event.target.name]: value})
	}
	
	const handleClick = () => {
		Swal.fire({
			icon: 'warning',
			title: 'Atenção',
			text: `Deseja realmente salvar as edições do usuário: ${usuario.name}?`,
			showCancelButton: true,
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Sim Salvar',
			showLoaderOnConfirm: true,
			preConfirm: () => {
				return axios
					.put('/salvar-edicao', {
							novosDados
					})
					.then((response) => {
						// console.log(response)
						callback()
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
					title: 'Usuario editado com sucesso!'
				})
			}
		})
	}

	return !usuario ? <Skeleton count={3}/> : (
		<div
			class='modal fade'
			id={`edita-mutuario${uuid}`}
			tabindex='-1'
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'
		>
			<div class='modal-dialog'>
				<div class='modal-content'>
					<div class='modal-header'>
						<h1 class='modal-title fs-5' id='exampleModalLabel'>
							Edição de usuário
						</h1>
						<button
							type='button'
							class='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</div>
					<div class='modal-body'>
						{/* -------------------------------------------- */}
						<section className='container'>
							<div className='row mt-5 mb-3'>
								<div className='col-md-6'>
									<input
										placeholder={usuario.name}
										type='text'
										name='name'
										onChange={handleChange}
										className='form-control'
									/>
								</div>
								<div className='col-md-6'>
									<input
										placeholder={usuario.lastName}
										type='text'
										name='lastName'
										onChange={handleChange}
										className='form-control'
									/>
								</div>
							</div>
							<div className='row'>
								<div className='col-md-6'>
									<input
										placeholder={usuario.email}
										type='email'
										name='email'
										onChange={handleChange}
										required
										className='form-control'
									/>
								</div>
								<div className='col-md-6'>
									<select
										className='form-select'
										aria-label='Default select example'
										name='type'
										onChange={handleChange}
									>
										<option dafeultValue>
											{usuario.type}
										</option>
										<option value='operador'>
											Operador
										</option>
										<option value='administrador'>
											Administrador
										</option>
										<option value='auditor'>Auditor</option>
									</select>
								</div>
							</div>
						</section>
					</div>
					<div class='modal-footer'>
						<button
							type='button'
							class='btn btn-secondary'
							data-bs-dismiss='modal'
						>
							Cancelar
						</button>
						<button type='button' class='btn btn-primary' onClick={handleClick}>
							Salvar mudanças
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ModalEditarUsuario

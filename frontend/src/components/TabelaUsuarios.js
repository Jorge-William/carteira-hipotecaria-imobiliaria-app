import axios from 'axios'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import ModalEditarUsuario from './ModalEditarUsuario'
import { v4 as uuidv4 } from 'uuid'

const TabelaUsuarios = ({ infoUser, callback }) => {
	const [user, setUser] = useState([])
	const [id_operador, setIdOperador] = useState()

	useEffect(() => {
		setUser(infoUser)
	}, [infoUser, user])

	const usuario_id = JSON.parse(localStorage.getItem('userData'))
	const {id} = usuario_id
	// pois map so rola com arrays...
	const usuarios = [user]
	const uuid = uuidv4()
	const deletarOperador = (id, name, lastName, usuarioId) => {
		Swal.fire({
			icon: 'warning',
			title: 'Atenção',
			text: `Deseja realmente deletar o operador ${name}?`,
			showCancelButton: true,
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Sim deletar',
			showLoaderOnConfirm: true,
			preConfirm: () => {
				return axios
					.post('/deletar-usuario', {
						params: {
							id,
							usuarioId,
							name, 
							lastName
						}
					})
					.then((response) => {
						// console.log(response)
						callback()
						setUser(infoUser)
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
					title: 'Operador deletado'
				})
			}
		})
	}
	const teste = (idDoUsuario) => {
		setIdOperador(idDoUsuario)
	}

	return !user ? (
		<p>Loading</p>
	) : (
		<>
			<table class='table'>
				<thead>
					<tr>
						<th scope='col'>#</th>
						<th scope='col'>Nome</th>
						<th scope='col'>Sobrenome</th>
						<th scope='col'>Email</th>
						<th scope='col'>Tipo</th>
					</tr>
				</thead>
				<tbody>
					{usuarios[0].listaUsuarios?.map((user, key) => {
						return (
							<>
								<tr key={key+1}>
									<th scope='row'>{user.id}</th>
									<td>{user.name}</td>
									<td>{user.lastName}</td>
									<td>{user.email}</td>
									<td>{user.type}</td>
									<td>
										<button
											className='btn btn-success btn-sm'
											data-bs-toggle='modal'
											data-bs-target={`#edita-mutuario${uuid}`}
											onClick={() => teste(user.id)}
										>
											<i class='bi bi-pencil-fill'></i>
										</button>
									</td>
									<td>
										<button
											className='btn btn-danger btn-sm'
											onClick={() =>
												deletarOperador(
													user.id,
													user.name,
													user.lastName,
													id,
												)
											}
										>
											<i className='bi bi-trash'></i>
										</button>
									</td>
								</tr>
								{
									<ModalEditarUsuario
										key={key}
										uuid={uuid}
										user={{
											id_operador
										}}
										callback={callback}
									/>
								}
							</>
						)
					})}
				</tbody>
			</table>
		</>
	)
}
export default TabelaUsuarios

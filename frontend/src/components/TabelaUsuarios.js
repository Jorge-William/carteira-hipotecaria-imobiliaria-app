import axios from 'axios'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

const TabelaUsuarios = ({ infoUser }) => {
	const [user, setUser] = useState([])

	useEffect(() => {
		setUser(infoUser)
	}, [infoUser, user])

	// pois map so rola com arrays...
	const usuarios = [user]
	console.log(usuarios[0].listaUsuarios)
	const deletarOperador = (id, name) => {
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
					.delete(`/deletar-usuario/${id}`)
					.then((response) => {
						console.log(response);
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

	return !user ? (
		<p>Loading</p>
	) : (
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
				{usuarios[0].listaUsuarios?.map((user) => {
					return (
						<tr>
							<th scope='row'>{user.id}</th>
							<td>{user.name}</td>
							<td>{user.lastName}</td>
							<td>{user.email}</td>
							<td>{user.type}</td>
							<td>
								<button
									className='btn btn-success btn-sm'
									// onClick={() =>

									// }
								>
									<i class='bi bi-pencil-fill'></i>
								</button>
							</td>
							<td>
								<button
									className='btn btn-danger btn-sm'
									onClick={() =>
										deletarOperador(user.id, user.name)
									}
								>
									<i className='bi bi-trash'></i>
								</button>
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}
export default TabelaUsuarios

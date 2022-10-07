import { useState, useEffect } from 'react'

const TabelaUsuarios = ({ infoUser }) => {
	const [user, setUser] = useState([])
	console.log(typeof user)

	useEffect(() => {
		setUser(infoUser)
	}, [infoUser, user])
	const usuarios = [user]

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
				{usuarios.map((user) => {
					return (
						<tr>
							<th scope='row'>{user.id}</th>
							<td>{user.name}</td>
							<td>{user.lastname}</td>
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
									// onClick={() =>

									// }
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

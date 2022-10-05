import { useState, useEffect } from 'react'

const TabelaUsuarios = ({ infoUser }) => {
	console.log(infoUser)

	const [user, setUser] = useState([])
	console.log(user)

	useEffect(() => {
		setUser(infoUser)
	}, [infoUser, user])

	return !infoUser ? (
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
				{/* {user.map((user) => {
					return (
						<tr>
							<th scope='row'>{user.id}</th>
							<td>{user.name}</td>
							<td>{user.lastname}</td>
							<td>{user.email}</td>
							<td>{user.type}</td>
						</tr>
					)
				})} */}
			</tbody>
		</table>
	)
}
export default TabelaUsuarios

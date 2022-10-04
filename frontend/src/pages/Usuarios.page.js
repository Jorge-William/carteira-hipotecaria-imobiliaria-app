import TabelaUsuarios from '../components/TabelaUsuarios'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Usuarios = () => {
	const [userData, setUserData] = useState()

	useEffect(() => {
		return axios
			.get('/usuarios')
			.then((response) => {
				setUserData(response)
			})
			.catch((error) => {
				console.log(error)
			})
	})

	return (
		<main>
			<h1>Usuários</h1>
			<TabelaUsuarios infoUser={userData} />
		</main>
	)
}

export default Usuarios

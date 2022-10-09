import TabelaUsuarios from '../components/TabelaUsuarios'
import ButtonAdicionarOperador from '../components/ButtonAdicionarOperador'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Usuarios = () => {
	const [userData, setUserData] = useState([])

	useEffect(() => {
		const fetchData = () => {
			return axios
				.get('/usuarios')
				.then((response) => {
					setUserData(response.data)
				})
				.catch((error) => {
					if (error.response) {
						console.log(error.response.data)
						console.log(error.response.status)
						console.log(error.response.headers)
					} else if (error.request) {
						console.log(error.request)
					}
				})
		}

		fetchData()
	}, [])

	return (
		<main>
			<h1>Usuários</h1>
			<ButtonAdicionarOperador />
			<TabelaUsuarios infoUser={userData} />
		</main>
	)
}

export default Usuarios

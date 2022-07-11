import React from 'react'
import { Link, useParams } from 'react-router-dom'
import DetalhesMutuario from '../components/DetalhesMutuario'

const MutuarioLeiDetalhesPage = () => {
	const { id } = useParams()
	return (
		<div>
			<h1>Mutuario Lei Detalhes</h1>
			<DetalhesMutuario id={id} />
			<Link to='/mutuario-lei'>Voltar</Link>
		</div>
	)
}

export default MutuarioLeiDetalhesPage

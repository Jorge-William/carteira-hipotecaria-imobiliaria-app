import React from 'react'
import { Link, useParams } from 'react-router-dom'
import DetalhesMutuario from '../components/DetalhesMutuario'

const MutuarioLeiDetalhesPage = () => {
	const { id } = useParams()
	return (
		<div className='mb-4'>
			<div className='row'>
				<div className='col'>
					<h2 className='mb-5'>Mutuario Lei Detalhes</h2>
				</div>
				<div className='col justify-end'>
					<button className='btn btn-outline-primary'>
						<Link to='/mutuario-lei'>Voltar</Link>
					</button>
				</div>
			</div>
			<DetalhesMutuario id={id} />
			<br />
			<button className='btn btn-outline-primary'>
				<Link style={{ textDecoration: 'none' }} to='/mutuario-lei'>
					Voltar
				</Link>
			</button>
		</div>
	)
}

export default MutuarioLeiDetalhesPage

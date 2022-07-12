import React from 'react'
import { Link, useParams } from 'react-router-dom'
import DetalhesMutuario from '../components/DetalhesMutuario'
import '../style/BtnVoltar.css'

const MutuarioLeiDetalhesPage = () => {
	const { id } = useParams()
	return (
		<div className='pb-5'>
			<div className='row'>
				<div className='col'>
					<h2 className='mb-5'>Mutuario Lei Detalhes</h2>
				</div>
				<div className='col'>
					<button className='btn btn-outline-primary float-end'>
						<Link to='/mutuario-lei'>
							<i className='bi bi-arrow-left'></i>Voltar
						</Link>
					</button>
				</div>
			</div>
			<DetalhesMutuario id={id} />
			<br />
			<button className='btn btn-outline-primary'>
				<Link to='/mutuario-lei'>
					<i className='bi bi-arrow-left'></i>Voltar
				</Link>
			</button>
		</div>
	)
}

export default MutuarioLeiDetalhesPage

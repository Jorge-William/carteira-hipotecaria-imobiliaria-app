import React from 'react'
import { Link, useParams } from 'react-router-dom'
import DetalhesMutuarioSfh from '../components/DetalhesMutuarioSfh'
import '../style/BtnVoltar.css'

const MutuarioSfhDetalhesPage = () => {
	const { id } = useParams()
	return (
		<div className='pb-5'>
			<div className='row'>
				<div className='col'>
					<h2 className='mb-5'>Detalhes</h2>
				</div>
				<div className='col'>
					<button className='btn btn-outline-primary float-end'>
						<Link to='/mutuario/sfh'>
							<i className='bi bi-arrow-left'></i>Voltar
						</Link>
					</button>
				</div>
			</div>
			{
				//---------------------------- Componente ---------------------
			}
			<DetalhesMutuarioSfh id={id} />
			{
				//---------------------------- Componente fim ---------------------
			}
			<br />
			<button className='btn btn-outline-primary'>
				<Link to='/mutuario/sfh'>
					<i className='bi bi-arrow-left'></i>Voltar
				</Link>
			</button>
		</div>
	)
}

export default MutuarioSfhDetalhesPage

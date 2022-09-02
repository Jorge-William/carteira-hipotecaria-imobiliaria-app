import React from 'react'
import { Link, useParams } from 'react-router-dom'
import DetalhesMutuarioAuditoria from '../components/DetalhesMutuarioAuditoria'
import '../style/BtnVoltar.css'

export function DetalhesAuditoria() {
	const { id } = useParams()
	return (
		<div className='pb-5'>
			<div className='row'>
				<div className='col'>
					<h2 className='mb-5'>Detalhes Auditoria</h2>
				</div>
				<div className='col'>
					<button className='btn btn-outline-primary float-end'>
						<Link to='/auditoria'>
							<i className='bi bi-arrow-left'></i>Voltar
						</Link>
					</button>
				</div>
			</div>
			{
				//---------------------------- Componente ---------------------
			}
			<DetalhesMutuarioAuditoria id={id} />
			{
				//---------------------------- Componente fim ---------------------
			}
			<br />
			<button className='btn btn-outline-primary'>
				<Link to='/auditoria'>
					<i className='bi bi-arrow-left'></i>Voltar
				</Link>
			</button>
		</div>
	)
}
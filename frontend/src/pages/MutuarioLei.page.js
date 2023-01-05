import React from 'react'
import TabelaMutuarioLei from '../components/TabelaMutuarioLei'
import { Link } from 'react-router-dom'

const MutuarioLei = () => {
	return (
		<section>
			<div className='row'>
				<div className='col-md'>
					<h1 className=''>Mutuário Lei</h1>
				</div>
				<div id='' className='col-md-2'>
					<Link to={`/mutuario/adicionar`}>
						<div
							className='btn btn-outline-success'
							data-bs-toggle='collapse'
							role='button'
							aria-expanded='false'
						>
							Adicionar um Mutuário
							<i className='bi bi-person-plus-fill ms-2' />
						</div>
					</Link>
				</div>
			</div>
			<hr />
			<TabelaMutuarioLei />
			<br />
		</section>
	)
}

export default MutuarioLei

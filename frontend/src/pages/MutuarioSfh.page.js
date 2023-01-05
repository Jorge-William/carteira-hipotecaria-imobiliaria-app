import React from 'react'
import TabelaMutuarioSfh from '../components/TabelaMutuarioSfh'
import { Link } from 'react-router-dom'

const MutuarioSfh = () => {
	return (
		<section>
			<div className='row'>
				<div className='col-md'>
					<h1 className=''>Mutuário SFH</h1>
				</div>
				<div id='' className='col-md-2'>
					<Link to={`/mutuario-sfh/adicionar`}>
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
			<TabelaMutuarioSfh />
		</section>
	)
}

export default MutuarioSfh

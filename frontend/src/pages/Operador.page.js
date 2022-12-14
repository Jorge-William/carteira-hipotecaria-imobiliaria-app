import TabelaOperador from '../components/TabelaOperador'
import TabelaOperadorSfh from '../components/TabelaOperadorSfh'
// import { useState } from 'react'

const Operador = () => {
	return (
		<section>
			<h1 className='mb-4'>Tela de Operador</h1>
			<nav className='mt-5'>
				<div className='nav nav-tabs' id='nav-tab' role='tablist'>
					<button
						className='nav-link active'
						id='nav-home-tab'
						data-bs-toggle='tab'
						data-bs-target='#nav-home'
						type='button'
						role='tab'
						aria-controls='nav-home'
						aria-selected='true'
					>
						Mutuario LEI
					</button>
					<button
						className='nav-link'
						id='nav-profile-tab'
						data-bs-toggle='tab'
						data-bs-target='#nav-profile'
						type='button'
						role='tab'
						aria-controls='nav-profile'
						aria-selected='false'
					>
						Mutuario SFH
					</button>
				</div>
			</nav>
			<div className='tab-content' id='nav-tabContent'>
				<div
					className='tab-pane fade show active'
					id='nav-home'
					role='tabpanel'
					aria-labelledby='nav-home-tab'
				>
					<div className='col-auto-12 '>
						<TabelaOperador />
					</div>
				</div>
				<div
					className='tab-pane fade'
					id='nav-profile'
					role='tabpanel'
					aria-labelledby='nav-profile-tab'
				>
					<div className='col-md-12 col-sm-12'>
						<TabelaOperadorSfh />
					</div>
				</div>
			</div>
		</section>
	)
}

export default Operador

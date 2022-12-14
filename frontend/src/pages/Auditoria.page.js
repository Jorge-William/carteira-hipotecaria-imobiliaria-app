import { DashboardAuditoria } from '../components/DashboardAuditoria'
import TableAuditoria from '../components/TableAuditoria'
import TableAuditoriaSfh from '../components/TableAuditoriaSfh'
import { useState } from 'react'

const Auditoria = () => {
	const [tipo, setTipo] = useState('lei')

	const handleClick = (tipo) => {
		setTipo(tipo)
	}
	return (
		<div>
			<section className='row'>
				<h1 className='d-flex justify-content-center'>Auditoria</h1>
			</section>
			<div className='row d-flex flex-xs-wrap-reverse flex-sm-wrap-reverse flex-md-wrap-reverse'>
				<div className='col-xs-12 col-md-12 col-lg-8'>
					<nav className='mt-5'>
						<div
							className='nav nav-tabs'
							id='nav-tab'
							role='tablist'
						>
							<button
								className='nav-link active'
								id='nav-home-tab'
								data-bs-toggle='tab'
								data-bs-target='#nav-home'
								type='button'
								role='tab'
								aria-controls='nav-home'
								aria-selected='true'
								onClick={() => {
									handleClick('lei')
								}}
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
								onClick={() => {
									handleClick('sfh')
								}}
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
								<TableAuditoria />
							</div>
						</div>
						<div
							className='tab-pane fade'
							id='nav-profile'
							role='tabpanel'
							aria-labelledby='nav-profile-tab'
						>
							<div className='col-md-12 col-sm-12'>
								<TableAuditoriaSfh />
							</div>
						</div>
					</div>
				</div>
				<div className='col-xs-12 col-sm-12 col-md-12 col-lg-4 '>
					<div className='m-5'>
						<DashboardAuditoria tipo={tipo} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Auditoria

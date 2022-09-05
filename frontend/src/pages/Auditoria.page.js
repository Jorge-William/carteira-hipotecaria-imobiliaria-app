import TableAuditoria from '../components/TableAuditoria'
import TableAuditoriaSfh from '../components/TableAuditoriaSfh'

const Auditoria = () => {
	return (
		<div>
			<section className='row'>
				<h1 className='d-flex justify-content-center'>Auditoria</h1>
			</section>

			<nav className='mt-5'>
				<div class='nav nav-tabs' id='nav-tab' role='tablist'>
					<button
						class='nav-link active'
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
						class='nav-link'
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
			<div class='tab-content' id='nav-tabContent'>
				<div
					class='tab-pane fade show active'
					id='nav-home'
					role='tabpanel'
					aria-labelledby='nav-home-tab'
				>
					<div className='col-md-6 col-sm-12'>
						<TableAuditoria />
					</div>
				</div>
				<div
					class='tab-pane fade'
					id='nav-profile'
					role='tabpanel'
					aria-labelledby='nav-profile-tab'
				>
					<div className='col-md-6 col-sm-12'>
						<TableAuditoriaSfh />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Auditoria

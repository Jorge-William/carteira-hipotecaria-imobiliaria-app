import TabelaTipoDocumentoLei from '../components/TabelaTipoDocumentoLei'
import TabelaTipoDocumentoSfh from '../components/TabelaTipoDocumentoSfh'

const TipoDeDocumento = () => {
	return (
		<section>
			<div>
				<h1 className='mb-4'>Tipo de Documentos</h1>
			</div>
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
						Documentos LEI
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
						Documentos SFH
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
						<TabelaTipoDocumentoLei />
					</div>
				</div>
				<div
					className='tab-pane fade'
					id='nav-profile'
					role='tabpanel'
					aria-labelledby='nav-profile-tab'
				>
					<div className='col-md-12 col-sm-12'>
						<TabelaTipoDocumentoSfh />
					</div>
				</div>
			</div>
		</section>
	)
}

export default TipoDeDocumento

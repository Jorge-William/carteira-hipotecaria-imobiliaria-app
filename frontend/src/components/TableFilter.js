import Autocomplete from './AutocompleteInput'
import '../style/TableFilter.css'
import { Link } from 'react-router-dom'

const TableFilter = (data) => {
	// console.log(data)
	return (
		<section className='mb-5'>
			<div className='row justify-content-center'>
				<div id='botao-filtro' className='col-md-3 d-grid'>
					<a
						className='btn btn-outline-primary'
						data-bs-toggle='collapse'
						href='#buscaPorPasta'
						role='button'
						aria-expanded='false'
						aria-controls='buscaPorPasta'
					>
						Buscar um mutuário
					</a>
				</div>
				<div id='botao-filtro' className='col-md-3 d-grid'>
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
			<div className='collapse' id='buscaPorPasta'>
				<div className='card card-body'>
					<ul className='nav nav-tabs' id='myTab' role='tablist'>
						<li className='nav-item' role='presentation'>
							<button
								className='nav-link active'
								id='home-tab'
								data-bs-toggle='tab'
								data-bs-target='#home'
								type='button'
								role='tab'
								aria-controls='home'
								aria-selected='true'
							>
								Busca por pasta
							</button>
						</li>
						<li className='nav-item' role='presentation'>
							<button
								className='nav-link'
								id='profile-tab'
								data-bs-toggle='tab'
								data-bs-target='#profile'
								type='button'
								role='tab'
								aria-controls='profile'
								aria-selected='false'
							>
								Busca por Nome
							</button>
						</li>
					</ul>
					<div className='tab-content' id='myTabContent'>
						<div
							className='tab-pane fade show active'
							id='home'
							role='tabpanel'
							aria-labelledby='home-tab'
						>
							<br />
							<div className='card card-body'>
								<div className='row '>
									<div className='col-md-12'>
										<Autocomplete
											tipo={'rotulo'}
											placeholder={
												'Código de Pasta - ex. L0001'
											}
											data={data.data}
											suggestions={Array.from(
												Object.values(data.data),
												(breed) => breed.rotulo
											).filter((elem, index, self) => {
												return (
													index === self.indexOf(elem)
												)
											})}
										/>
									</div>
								</div>
							</div>
						</div>
						<div
							className='tab-pane fade'
							id='profile'
							role='tabpanel'
							aria-labelledby='profile-tab'
						>
							<br />
							<div className='card card-body'>
								<div className='row '>
									<div className='col-12'>
										<Autocomplete
											tipo={'nome'}
											placeholder={'Nome do mutuário'}
											data={data.data}
											suggestions={Array.from(
												Object.values(data.data),
												(breed) => breed.nome
											).filter((elem, index, self) => {
												return (
													index === self.indexOf(elem)
												)
											})}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<br />
				</div>
			</div>
		</section>
	)
}

export default TableFilter

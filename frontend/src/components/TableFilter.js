import Autocomplete from './AutocompleteInput'
import '../style/TableFilter.css'
import AdicionarMutuarioLei from './modal/AdicionarMutuarioLei.modal'

const TableFilter = (data) => {
	return (
		<section className='mb-5'>
			<div className='row justify-content-center'>
				<div id='botao-filtro' className='col-md-3 d-grid'>
					<a
						class='btn btn-outline-primary'
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
					<a
						class='btn btn-outline-success'
						href='#buscaPorPasta'
						role='button'
						aria-expanded='false'
						aria-controls='buscaPorPasta'
						data-bs-toggle='modal'
						data-bs-target='#staticBackdrop-mutuario'
					>
						Adicionar um Mutuário
						<i class='bi bi-person-plus-fill ms-2'></i>
					</a>
				</div>
			</div>
			<AdicionarMutuarioLei />
			<div class='collapse' id='buscaPorPasta'>
				<div class='card card-body'>
					<ul class='nav nav-tabs' id='myTab' role='tablist'>
						<li class='nav-item' role='presentation'>
							<button
								class='nav-link active'
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
						<li class='nav-item' role='presentation'>
							<button
								class='nav-link'
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
					<div class='tab-content' id='myTabContent'>
						<div
							class='tab-pane fade show active'
							id='home'
							role='tabpanel'
							aria-labelledby='home-tab'
						>
							<br />
							<div class='card card-body'>
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
							class='tab-pane fade'
							id='profile'
							role='tabpanel'
							aria-labelledby='profile-tab'
						>
							<br />
							<div class='card card-body'>
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

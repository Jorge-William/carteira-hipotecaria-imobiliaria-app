import React from 'react'
import UserProfileIcon from './UserProfileIcon'
import 'bootstrap/dist/css/bootstrap.min.css'

const Menu = ({ logout }) => {
	return (
		<section className='container'>
			<nav class='navbar navbar-expand-lg fixed-top navbar-dark bg-dark'>
				<div class='container'>
					<a class='navbar-brand' href='/'>
						CHI
					</a>
					<button
						class='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span class='navbar-toggler-icon'></span>
					</button>
					<div
						class='collapse navbar-collapse'
						id='navbarSupportedContent'
					>
						<ul class='navbar-nav me-auto mb-2 mb-lg-0'>
							<li class='nav-item'>
								<a
									class='nav-link active'
									aria-current='page'
									href='dashboard'
								>
									Home
								</a>
							</li>
							<li class='nav-item dropdown'>
								<a
									class='nav-link dropdown-toggle'
									href='/'
									id='navbarDropdown'
									role='button'
									data-bs-toggle='dropdown'
									aria-expanded='false'
								>
									Mutuário
								</a>
								<ul
									class='dropdown-menu'
									aria-labelledby='navbarDropdown'
								>
									<li>
										<a class='dropdown-item' href='/'>
											SFH
										</a>
									</li>
									<li>
										<hr class='dropdown-divider' />
									</li>
									<li>
										<a class='dropdown-item' href='/'>
											LEI
										</a>
									</li>
								</ul>
							</li>
							<li class='nav-item dropdown'>
								<a
									class='nav-link dropdown-toggle'
									href='/'
									id='navbarDropdown'
									role='button'
									data-bs-toggle='dropdown'
									aria-expanded='false'
								>
									Pastas
								</a>
								<ul
									class='dropdown-menu'
									aria-labelledby='navbarDropdown'
								>
									<li>
										<a class='dropdown-item' href='/'>
											SFH
										</a>
									</li>
									<li>
										<hr class='dropdown-divider' />
									</li>
									<li>
										<a class='dropdown-item' href='/'>
											LEI
										</a>
									</li>
								</ul>
							</li>
						</ul>
						<form class='d-flex'>
							<input
								class='form-control me-2'
								type='search'
								placeholder='Search'
								aria-label='Search'
							/>
							<button
								class='btn btn-outline-success'
								type='submit'
							>
								Busca
							</button>
						</form>
						<UserProfileIcon />
					</div>
				</div>
			</nav>
			{/* ----------------------------- Modal --------------------------- */}
			<div
				className='modal fade'
				id='exampleModal'
				tabindex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog  modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLabel'>
								Logout
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							<h3>Deseja sair da aplicação?</h3>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-outline-primary'
								data-bs-dismiss='modal'
							>
								Cancelar
							</button>
							<button
								type='button'
								className='btn btn-danger'
								onClick={logout}
							>
								Sair
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* ----------------------------- Modal --------------------------- */}
		</section>
	)
}

export default Menu

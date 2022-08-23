import React from 'react'
import UserProfileIcon from './UserProfileIcon'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthService from '../services/auth.service'
import { Link } from 'react-router-dom'
import logoClubeMilitar from '../assets/brasao_do_clube_militar.png'

const Menu = ({ logout }) => {
	const deslogar = (e) => {
		e.preventDefault()
		logout()
		AuthService.logout()
	}

	return (
		<section className='container'>
			<nav className='navbar navbar-expand-lg fixed-top navbar-dark bg-dark'>
				<div className='container'>
					<Link className='navbar-brand' to='/dashboard'>
						<img
							style={{ width: 60 }}
							src={logoClubeMilitar}
							alt='Logotipo do clube militar RJ'
						/>
					</Link>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div
						className='collapse navbar-collapse'
						id='navbarSupportedContent'
					>
						<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
							<li className='nav-item'>
								<Link
									to='/dashboard'
									className='nav-link active'
									aria-current='page'
								>
									Home
								</Link>
							</li>
							<li className='nav-item dropdown'>
								<a
									className='nav-link dropdown-toggle'
									href='/'
									id='navbarDropdown'
									role='button'
									data-bs-toggle='dropdown'
									aria-expanded='false'
								>
									Mutuário
								</a>
								<ul
									className='dropdown-menu'
									aria-labelledby='navbarDropdown'
								>
									<li>
										<Link
											to='/mutuario/sfh'
											className='dropdown-item'
										>
											SFH
										</Link>
									</li>
									<li>
										<hr className='dropdown-divider' />
									</li>
									<li>
										<Link
											to='/mutuario/lei'
											className='dropdown-item'
										>
											LEI
										</Link>
									</li>
								</ul>
							</li>
							{/* <li className='nav-item dropdown'>
								<a
									className='nav-link dropdown-toggle'
									href='/'
									id='navbarDropdown'
									role='button'
									data-bs-toggle='dropdown'
									aria-expanded='false'
								>
									Pastas
								</a>
								<ul
									className='dropdown-menu'
									aria-labelledby='navbarDropdown'
								>
									<li>
										<a className='dropdown-item' href='/'>
											SFH
										</a>
									</li>
									<li>
										<hr className='dropdown-divider' />
									</li>
									<li>
										<a className='dropdown-item' href='/'>
											LEI
										</a>
									</li>
								</ul>
							</li> */}
						</ul>
						{/* <form className='d-flex'>
							<input
								className='form-control me-2'
								type='search'
								placeholder='Busca'
								aria-label='Busca'
							/>
							<button
								className='btn btn-outline-success'
								type='submit'
							>
								Buscar
							</button>
						</form> */}
						<UserProfileIcon />
					</div>
				</div>
			</nav>
			{/* ----------------------------- Modal --------------------------- */}
			<div
				className='modal fade'
				id='exampleModal'
				tabIndex='-1'
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
								data-bs-dismiss='modal'
								onClick={deslogar}
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

import React from 'react'
import UserProfileIcon from './UserProfileIcon'
import 'bootstrap/dist/css/bootstrap.min.css'

class Menu extends React.Component {
	render() {
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
										href='/'
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
											<a class='dropdown-item' href='#'>
												SFH
											</a>
										</li>
										<li>
											<hr class='dropdown-divider' />
										</li>
										<li>
											<a class='dropdown-item' href='#'>
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
			</section>
		)
	}
}

export default Menu

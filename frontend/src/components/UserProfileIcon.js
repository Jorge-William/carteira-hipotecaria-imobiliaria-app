import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/UserProfileIcon.css'
// import AuthService from '../services/auth.service'

class UserProfileIcon extends React.Component {
	render() {
		return (
			<section className='btn-group'>
				<button
					className='perfil btn btn-outline-secondary dropdown-toggle'
					type='button'
					data-bs-toggle='dropdown'
					data-bs-display='static'
					aria-expanded='false'
				>
					<i className='bi bi-person'></i>
				</button>
				<ul
					className='dropdown-menu dropdown-menu-sm-start dropdown-menu-md-end'
					aria-labelledby='dropdownMenuButton'
				>
					<li className='dropdown-header'>
						<h3>Jorge William</h3>
					</li>
					<li className='dropdown-divider'></li>
					<li>
						<a className='dropdown-item' href='/'>
							Atividade
						</a>
					</li>
					<li>
						<a className='dropdown-item' href='/'>
							Usuários
						</a>
					</li>
					<li>
						<a className='dropdown-item' href='/'>
							Configurações
						</a>
					</li>
					<li>
						<a className='dropdown-item' href='/'>
							Auditoria
							<span className='badge bg-danger m-1'>4</span>
						</a>
					</li>
					<li className='dropdown-divider'></li>
					<li data-bs-toggle='modal' data-bs-target='#exampleModal'>
						{/* <button
							className='btn  dropdown-item'
							data-bs-toggle='modal'
							data-bs-target='#exampleModal'
							onClick={() => {
								AuthService.logout()
							}}
						>
							<strong>Fazer logout</strong>
						</button> */}

						<span className='dropdown-item' type='button'>
							Sair
						</span>
					</li>
				</ul>
			</section>
		)
	}
}

export default UserProfileIcon

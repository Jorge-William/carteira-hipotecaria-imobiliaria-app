import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/UserProfileIcon.css'

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
					<i className='bi bi-person' height='40px'></i>
				</button>
				<ul
					class='dropdown-menu dropdown-menu-sm-start dropdown-menu-md-end'
					aria-labelledby='dropdownMenuButton'
				>
					<li class='dropdown-header'>
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
							Auditoria
							<span class='badge bg-danger m-1'>4</span>
						</a>
					</li>
					<li>
						<a className='dropdown-item' href='/'>
							Configurações
						</a>
					</li>
					<li className='dropdown-divider'></li>
					<li>
						<a className='dropdown-item' href='/'>
							<strong>Fazer logout</strong>
						</a>
					</li>
				</ul>
			</section>
		)
	}
}

export default UserProfileIcon

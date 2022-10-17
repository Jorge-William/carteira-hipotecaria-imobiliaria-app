import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/UserProfileIcon.css'
import { Link } from 'react-router-dom'
// import AuthService from '../services/auth.service'

const UserProfileIcon = () => {
	let userName = null
	userName = JSON.parse(localStorage.getItem('userData'))
	const { name, type } = userName
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
					<h3>{name}</h3>
				</li>
				<li className='dropdown-divider'></li>
				<li>
					<a className='dropdown-item' href='/'>
						Atividade
					</a>
				</li>
				{type === 'administrador' && (
					<li>
						<Link className='dropdown-item' to='/usuarios'>
							Gerenciar operadores
						</Link>
					</li>
				)}
				{type === 'administrador' && (
					<li>
						<Link className='dropdown-item' to='/auditoria'>
							Auditoria
						</Link>
					</li>
				)}
				{/* <li>
					<a className='dropdown-item' href='/'>
						Configurações
					</a>
				</li> */}
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

export default UserProfileIcon

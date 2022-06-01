import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Menu from './components/Menu'
import { Navigate } from 'react-router-dom'
import './style/App.css'

class App extends React.Component {
	constructor() {
		super()

		this.verifyAccess = this.verifyAccess.bind(this)
		this.state = {
			isAuthorized: true
		}
	}

	verifyAccess() {
		const result = localStorage.getItem('user')
		console.log(result)
		if (result) {
			return true
		}
		return false
	}

	componentDidMount() {
		const isLogged = this.verifyAccess()
		console.log(isLogged)
		if (isLogged)
			this.setState({
				isAuthorized: true
			})
	}

	render() {
		if (!this.state.isAuthorized) {
			return <Navigate to='/' />
		} else {
			return (
				<main className='container'>
					<Menu />

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
									<h5
										className='modal-title'
										id='exampleModalLabel'
									>
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
									>
										<a id='btn-sair' href='/'>
											Sair
										</a>
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* ----------------------------- Modal --------------------------- */}
				</main>
			)
		}
	}
}

export default App

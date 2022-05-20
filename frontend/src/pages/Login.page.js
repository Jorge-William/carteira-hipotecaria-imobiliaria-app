import React from 'react'
import '../style/Login.page.css'
import { Navigate } from 'react-router-dom'
import validator from 'validator'

class LoginPage extends React.Component {
	constructor(props) {
		super(props)
		this.onChange = this.onChange.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
		this.state = {
			email: '',
			senha: '',
			loading: false,
			redirect: false,
			disabled: true
		}
	}

	onChange(e) {
		this.setState(
			{
				[e.target.name]: e.target.value
			},
			() => {
				validator.isEmail(this.state.email) &&
				this.state.senha.length > 6
					? this.setState({ disabled: false })
					: this.setState({ disabled: true })
			}
		)
	}

	handleLogin(e) {
		e.preventDefault()
		this.setState({
			loading: true,
			redirect: true
		})
	}

	render() {
		if (this.state.redirect) {
			return <Navigate to='/principal' />
		} else {
			return (
				<div className='borda'>
					<div className='row justify-content-center '>
						<div className='col-sm-4 align-self-end'>
							<div className='card mt-5'>
								<div className='card-header'>Login</div>
								<div className='card-body'>
									<form
										className='p-4'
										onSubmit={this.handleLogin}
									>
										<div className='mb-3'>
											<label
												htmlFor='exampleInputEmail1'
												class='form-label'
											>
												Email
											</label>
											<input
												value={this.state.email}
												name='email'
												type='email'
												className='form-control'
												id='exampleInputEmail1'
												aria-describedby='emailHelp'
												onChange={this.onChange}
											/>
										</div>
										<div className='mb-3'>
											<label
												htmlFor='exampleInputPassword1'
												className='form-label'
											>
												Senha
											</label>
											<input
												value={this.state.senha}
												name='senha'
												type='password'
												className='form-control'
												id='exampleInputPassword1'
												onChange={this.onChange}
											/>
										</div>
										<div className='d-grid gap-4 col mx-auto mt-4'>
											<button
												type='submit'
												className='btn btn-primary'
												onClick={this.handleLogin}
												disabled={this.state.disabled}
											>
												{this.state.disabled && (
													<div>
														<span className='spinner-border spinner-border-sm'></span>
														<span>
															Validando...
														</span>
													</div>
												)}
												{!this.state.disabled && (
													<span>Entrar</span>
												)}
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}
}

export default LoginPage

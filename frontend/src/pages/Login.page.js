import React, { useState } from 'react'
import 'animate.css'
import '../style/Login.page.css'
import validator from 'validator'
import PageLoader from '../components/PageLoader'
// import AuthService from '../services/auth.service'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/auth.service'

const LoginPage = ({ authenticate }) => {
	const navigate = useNavigate()

	const [errorMessage, setErrorMessage] = useState(false)
	const [pageLoading, setPageLoading] = useState(false)

	const useInput = (initialValue) => {
		const [value, setValue] = useState(initialValue)

		const handleChange = (event) => {
			setValue(event.target.value)
		}

		return {
			value,
			onChange: handleChange
		}
	}

	const email = useInput('')
	const senha = useInput('')

	// Caso email não seja válido e a senha seja menor que 8 o botão entrar será desabilitado
	const isValid = () => {
		const emailValid = validator.isEmail(email.value)
		const senhaValid = senha.value.length > 7
		if (!emailValid || !senhaValid) {
			return true
		} else {
			return false
		}
	}

	const onClick = async (e) => {
		e.preventDefault()
		const response = await AuthService.login(email.value, senha.value)
		if (response) {
			setPageLoading(true)
			setTimeout(() => {
				authenticate()
				navigate('dashboard')
			}, 2000)
		} else {
			await setErrorMessage(true)
		}
	}

	return (
		<div className='container  borda-container'>
			<div className='row align-items-center'>
				<section className='col-6 borda-aside' id='aside-login'>
					<div className='m-4 '>
						<h1 id='side-info'>Efetuar Login</h1>
						<h4 className='animate__jello'>
							Seja bem vindo novamente!
						</h4>
						<p>
							Ainda não posssui acesso? Contacte o administrador
						</p>
					</div>
					<div className='container loading-container'>
						<div className='row'>
							<div className='col'></div>
							<div className='col align-self-end'>
								{pageLoading && <PageLoader />}
							</div>
							<div className='col'></div>
						</div>
					</div>
				</section>
				<section className='col-6' id='form-section'>
					{errorMessage && (
						<div
							className='alert alert-danger m-3 animate__animated animate__shakeY animate__delay-1s animate__repeat-3'
							role='alert'
						>
							E-mail ou senha incorretos. Insira suas informações
							de login novamente ou solicite ajuda do
							administrador para obter acesso à sua conta.
						</div>
					)}

					<form onSubmit={onClick} className='m-3'>
						<div className='mb-3'>
							<label
								htmlFor='exampleInputEmail1'
								className='form-label label-color'
							>
								Endereço de e-mail
							</label>
							<input
								type='email'
								className='form-control'
								id='exampleInputEmail1'
								aria-describedby='emailHelp'
								onChange={email.onChange}
							/>
						</div>
						<div className='mb-3'>
							<label
								htmlFor='exampleInputPassword1'
								className='form-label label-color'
							>
								Senha
							</label>
							<input
								type='password'
								className='form-control'
								id='exampleInputPassword1'
								onChange={senha.onChange}
							/>
						</div>
						<div className='mb-4'>
							<small className='label-color'>
								Ao fazer login, eu concordo com a{' '}
								<a href='/dashboard'>
									Declaração de Privacidade e os Termos de
									Serviço da aplicação
								</a>
								.
							</small>
						</div>
						<div className='d-grid gap-2'>
							<button
								disabled={isValid()}
								type='submit'
								className='btn btn-primary '
							>
								Efetuar login
							</button>
						</div>
					</form>
				</section>
			</div>
		</div>
	)
}

export default LoginPage

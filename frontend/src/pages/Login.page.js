import React, { useState } from 'react'
import '../style/Login.page.css'
// import validator from 'validator'
// import AuthService from '../services/auth.service'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/auth.service'

const LoginPage = ({ authenticate }) => {
	const navigate = useNavigate()

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

	const onClick = (e) => {
		e.preventDefault()
		const result = AuthService.login(email, senha).catch(
			(err) => err.message
		)
		if (result) {
			authenticate()
			navigate('dashboard')
		}
	}

	return (
		<div className='container '>
			<div className='row align-items-center borda'>
				<section className='col-8 borda' id='aside-login'>
					{/* <img src={Capa} alt='teste' /> */}
				</section>
				<section className='col-4'>
					<div className='m-4'>
						<h2>Insira suas credenciais</h2>
					</div>
					<form onSubmit={onClick} className='m-4'>
						<div class='mb-3'>
							<label for='exampleInputEmail1' class='form-label'>
								Email
							</label>
							<input
								type='email'
								class='form-control'
								id='exampleInputEmail1'
								aria-describedby='emailHelp'
								onChange={email.onChange}
							/>
						</div>
						<div class='mb-3'>
							<label
								for='exampleInputPassword1'
								class='form-label'
							>
								Senha
							</label>
							<input
								type='password'
								class='form-control'
								id='exampleInputPassword1'
								onChange={senha.onChange}
							/>
						</div>
						<button type='submit' class='btn btn-primary'>
							Entrar
						</button>
					</form>
				</section>
			</div>
		</div>
	)
}

export default LoginPage

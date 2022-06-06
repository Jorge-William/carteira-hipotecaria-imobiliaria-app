import React, { useState, useEffect } from 'react'
import '../style/Login.page.css'
// import validator from 'validator'
// import AuthService from '../services/auth.service'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/auth.service'

const LoginPage = ({ authenticate }) => {
	const navigate = useNavigate()

	// const [disable, setDisable] = useState(false)

	// setEmail = (e) => {
	// 	this.setState(
	// 		{
	// 			[e.target.name]: e.target.value
	// 		},
	// 		() => {
	// 			validator.isEmail(email) && email > 6
	// 				? setDisable(false)
	// 				: setDisable(true)
	// 		}
	// 	)
	// }

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

	const onClick = () => {
		AuthService.login(email, senha)
			.then((result) => {
				console.log(result)
				authenticate()
				navigate('dashboard')
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<div className='borda'>
			<form>
				<input placeholder='Email' onChange={email.onChange} />
				<input
					placeholder='password'
					type='password'
					onChange={senha.onChange}
				/>
				<button type='button' onClick={onClick}>
					Entrar
				</button>
			</form>
		</div>
	)
}

export default LoginPage

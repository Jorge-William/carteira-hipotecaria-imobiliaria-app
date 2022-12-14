import '../style/FormAlteraSenha.css'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
// import AuthService from '../services/auth.service'

const FormAlterarSenha = ({ callback }) => {
	const [password, setPassword] = useState({
		passwordOne: '',
		passwordTwo: ''
	})
	const [alternateIcon, setAlternateIcon] = useState(false)

	const localStorageData = JSON.parse(localStorage.getItem('userData'))

	const { id, name, primeiroLogin } = localStorageData

	const handleChange = (event) => {
		const value = event.target.value
		const name = event.target.name
		setPassword({ ...password, [name]: value })
	}

	const { passwordOne } = password

	// const navigate = useNavigate()

	const passwordValidate = () => {
		if (password.passwordOne !== password.passwordTwo) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'As senhas devem ser idênticas!'
				// footer: '<a href="">Why do I have this issue?</a>'
			})
		} else if (
			password.passwordOne === '12345678' &&
			password.passwordTwo === '12345678'
		) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Evite usar números em sequência!'
			})
		} else {
			Swal.fire({
				icon: 'question',
				title: 'Deseja salvar sua nova senha?',
				showCancelButton: true,
				confirmButtonText: 'Salvar a nova senha',
				showLoaderOnConfirm: true,
				preConfirm: () => {
					return axios
						.put('/modificar-senha', {
							senha: passwordOne,
							userId: id,
							name,
							primeiroLogin
						})
						.then((response) => {
							const data = JSON.parse(
								localStorage.getItem('userData')
							)
							const { primeiroLogin } = data

							if (primeiroLogin) {
								localStorage.setItem(
									'userData.primeiroLogin',
									false
								)
							}
							if (response) {
								callback()
								// navigate(`/dashboard`, {
								// 	replace: true
								// })
							} else if (!response.data.status) {
								throw new Error(response.data.status)
							}
							return response
						})
						.catch((error) => {
							Swal.showValidationMessage(
								`Request failed: ${error}`
							)
						})
				},
				allowOutsideClick: () => !Swal.isLoading()
			}).then((result) => {
				if (result.isConfirmed) {
					Swal.fire({
						icon: 'success',
						title: 'Senha alterada com sucesso',
						text: 'Agora faça login com a nova senha.'
					})
				}
			})
		}
	}

	return (
		<section className='container mt-5 ' id='main-container'>
			<div className='row '>
				<div className='col-sm-12 align-self-center'>
					<div className='row mb-3'>
						<div className='col-10'>
							<label
								for='exampleFormControlInput1'
								className='form-label text-secondary'
							>
								Digite uma nova senha
							</label>
							<input
								autoComplete='new-password'
								name='passwordOne'
								type={alternateIcon ? 'text' : 'password'}
								className='form-control'
								id='exampleFormControlInput1'
								// placeholder='name@example.com'
								onChange={handleChange}
							/>
						</div>
						<div className='col-2 icon-visualization'>
							<div>
								{alternateIcon ? (
									<i
										onClick={() =>
											setAlternateIcon((prev) => !prev)
										}
										className='bi bi-eye-slash '
										style={{
											fontSize: 30
										}}
									></i>
								) : (
									<i
										onClick={() =>
											setAlternateIcon((prev) => !prev)
										}
										style={{ fontSize: 30 }}
										className='bi bi-eye'
									></i>
								)}
							</div>
						</div>
					</div>
					<div className='row mb-3'>
						<div className='col-10'>
							<label
								for='exampleFormControlInput1'
								className='form-label text-secondary'
							>
								Repita a senha
							</label>
							<input
								autoComplete='new-password'
								name='passwordTwo'
								type={alternateIcon ? 'text' : 'password'}
								className='form-control'
								id='exampleFormControlInput1'
								// placeholder='name@example.com'
								onChange={handleChange}
							/>
						</div>
					</div>
				</div>
			</div>
			<button
				className='btn btn-success'
				disabled={
					password.passwordOne.length < 8 &&
					password.passwordTwo.length < 8
						? true
						: false
				}
				onClick={() => passwordValidate()}
			>
				Salvar senha
			</button>
		</section>
	)
}

export default FormAlterarSenha

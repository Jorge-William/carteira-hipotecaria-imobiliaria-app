import FormAlterarSenha from '../components/FormAlterarSenha'
import AuthService from '../services/auth.service'

const AlterarSenha = ({ logout }) => {
	const callback = () => {
		logout()
		AuthService.logout()
	}

	return (
		<>
			<h1>Alterar senha</h1>
			<FormAlterarSenha callback={() => callback()} />
		</>
	)
}

export default AlterarSenha

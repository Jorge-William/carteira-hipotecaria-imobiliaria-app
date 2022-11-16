import { useNavigate } from 'react-router-dom'

const useFirstLogin = () => {
	const navigate = useNavigate()
	const data = JSON.parse(localStorage.getItem('userData'))
	const { primeiroLogin } = data

	if (data && primeiroLogin) {
		// callback(true)
		return navigate('/alterar-senha')
	}
}

export default useFirstLogin

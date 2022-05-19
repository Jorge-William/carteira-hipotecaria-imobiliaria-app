import React from 'react'
import { Link } from 'react-router-dom'

class LoginPage extends React.Component {
	render() {
		return (
			<>
				<h1>Pagina de Login</h1>
				<Link to='/principal'>Principal</Link>
			</>
		)
	}
}

export default LoginPage

import React from 'react'
import { Link } from 'react-router-dom'

class PrincipalRoute extends React.Component {
	render() {
		return (
			<>
				<h1>Principal</h1>
				<Link to='/login'>Link para o Login</Link>
			</>
		)
	}
}

export default PrincipalRoute

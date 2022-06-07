import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style/App.css'
import Login from './pages/Login.page'
import Menu from './components/Menu'
import Dashboard from './pages/Dashboard.page'

const App = () => {
	const [auth, setAuth] = useState(null)

	useEffect(() => {
		let user = localStorage.getItem('user')
		user && JSON.parse(user) ? setAuth(true) : setAuth(false)
	}, [])

	useEffect(() => {
		localStorage.setItem('user', auth)
	}, [auth])

	return (
		<main className='container'>
			{auth && <Menu logout={() => setAuth(false)} />}
			<Routes>
				{!auth && (
					<Route
						path='/login'
						element={<Login authenticate={() => setAuth(true)} />}
					/>
				)}
				{auth && (
					<Route
						path='/profile'
						element={<Dashboard logout={() => setAuth(false)} />}
					/>
				)}
				<Route
					path='*'
					element={<Navigate to={auth ? '/dashboard' : '/login'} />}
				/>
			</Routes>
		</main>
	)
}

export default App

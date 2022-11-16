import React from 'react'
import InfoCards from '../components/InfoCards'
import '../style/Dashboard.css'
// import useFirstLogin from '../hooks/useFirstLogin'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
	const data = JSON.parse(localStorage.getItem('userData'))
	const { primeiroLogin } = data

	const navigate = useNavigate()
	useEffect(() => {
		if ( primeiroLogin) {
			// callback(true)
			return navigate('/alterar-senha')
		}
	},[primeiroLogin, navigate])

	return (
		<section>
			<h1>Dashboard</h1>
			<InfoCards />
		</section>
	)
}

export default Dashboard

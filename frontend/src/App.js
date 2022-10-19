import React, { useState, useEffect } from 'react'
import 'animate.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style/App.css'
import Login from './pages/Login.page'
import Menu from './components/Menu'
import Dashboard from './pages/Dashboard.page'
import MutuarioLei from './pages/MutuarioLei.page'
import MutuarioSfh from './pages/MutuarioSfh.page'
import MutuarioLeiDetalhesPage from './pages/MutuarioLeiDetalhes.page'
import MutuarioSfhDetalhesPage from './pages/MutuarioSfhDetalhes.page'
import AdicionarDocumentoPage from './pages/AdicionarDocumento.page'
import AdicionarDocumentoSfhPage from './pages/AdicionarDocumentoSfh.page'
import AdicionarMutuarioLei from './pages/AdicionarMutuarioLei.page'
import AdicionarMutuarioSfh from './pages/AdicionarMutuarioSfh.page'
import Auditoria from './pages/Auditoria.page'
import { DetalhesAuditoria } from './pages/DetalhesAuditoria.page'
import { AuditandoDoc } from './pages/AuditandoDoc.page'
import { AuditandoDocSfh } from './pages/AuditandoDocSfh.page'
import { DetalhesAuditoriaSfh } from './pages/DetalhesAuditoriaSfh.page'
import Usuarios from './pages/Usuarios.page'
import Operador from './pages/Operador.page'

const App = () => {
	const [auth, setAuth] = useState(null)
	// const { id } = useParams()

	useEffect(() => {
		let user = localStorage.getItem('user')
		user && JSON.parse(user) ? setAuth(true) : setAuth(false)
	}, [])

	useEffect(() => {
		localStorage.setItem('user', auth)
	}, [auth])

	return (
		<main className='container-fluid'>
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
						path='/dashboard'
						element={<Dashboard logout={() => setAuth(false)} />}
					/>
				)}
				{auth && (
					<Route path='/mutuario/lei' element={<MutuarioLei />} />
				)}
				{auth && (
					<Route path='/mutuario/sfh' element={<MutuarioSfh />} />
				)}
				{auth && (
					<Route
						path='/detalhes/:id'
						element={<MutuarioLeiDetalhesPage />}
					/>
				)}
				{auth && (
					<Route
						path='/detalhes-sfh/:id'
						element={<MutuarioSfhDetalhesPage />}
					/>
				)}
				{auth && (
					<Route
						path='/detalhes-auditoria/:id'
						element={<DetalhesAuditoria />}
					/>
				)}
				{auth && (
					<Route
						path='/detalhes-auditoria-sfh/:id'
						element={<DetalhesAuditoriaSfh />}
					/>
				)}
				{auth && (
					<Route path='/auditando/:id' element={<AuditandoDoc />} />
				)}
				{auth && (
					<Route
						path='/auditando-sfh/:id'
						element={<AuditandoDocSfh />}
					/>
				)}
				{auth && (
					<Route
						path='/mutuario/lei/adicionardocumento/:id'
						element={<AdicionarDocumentoPage />}
					/>
				)}
				{auth && (
					<Route
						path='/mutuario/sfh/adicionardocumento/:id'
						element={<AdicionarDocumentoSfhPage />}
					/>
				)}
				{auth && (
					<Route path='/mutuario/sfh' element={<MutuarioSfh />} />
				)}
				{auth && (
					<Route
						path='/mutuario/adicionar'
						element={<AdicionarMutuarioLei />}
					/>
				)}
				{auth && (
					<Route
						path='/mutuario-sfh/adicionar'
						element={<AdicionarMutuarioSfh />}
					/>
				)}
				{auth && (
					<Route
						path='/operador'
						element={<Operador />}
					/>
				)}
				{auth && <Route path='/auditoria' element={<Auditoria />} />}
				{auth && <Route path='/usuarios' element={<Usuarios />} />}
				<Route
					path='*'
					element={<Navigate to={auth ? '/dashboard' : '/login'} />}
				/>
			</Routes>
		</main>
	)
}

export default App

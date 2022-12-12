import React, { useState, useEffect } from 'react'
import { getMutuariosSfh } from '../services/getMutuarios.service'
import '../style/Pagination.scss'
import '../style/TabelaMutuario.css'
import FiltroMutuarioSfh from '../components/FiltroMutuarioSfh'

const TabelaMutuarioSfh = () => {
	const [mutSfhData, setMutSfhData] = useState([])

	const fetchMutuarios = () => {
		getMutuariosSfh().then((mutuario) => setMutSfhData(mutuario))
	}
	useEffect(() => {
		// setTimeout(() => {
		fetchMutuarios()
		// }, 1000)
	}, [])

	return (
		<div>
			<FiltroMutuarioSfh data={[mutSfhData]} />
		</div>
	)
}
export default TabelaMutuarioSfh

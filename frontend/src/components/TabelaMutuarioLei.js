import React from 'react'
import { getMutuariosLei } from '../services/getMutuarios.service'
import { useEffect, useState } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
// import Pagination from './Pagination'
import '../style/Pagination.scss'
import '../style/TabelaMutuario.css'

// import { Link } from 'react-router-dom'
import FiltroMutuarioLei from './FiltroMutuarioLei'

// let PageSize = 1

const TabelaMutuarioLei = () => {
	const [mutLeiData, setMutLeiData] = useState([])

	// const [currentPage, setCurrentPage] = useState(1)
	// const [ordemAlfabetica, setOrdemAlfabetica] = useState(false)
	// const [tableData, setTableData] = useState([])

	const fetchMutuarios = () => {
		getMutuariosLei().then((mutuario) => setMutLeiData(mutuario))
	}
	useEffect(() => {
		// setTimeout(() => {
		fetchMutuarios()
		// }, 500)
	}, [])

	useEffect(() => {}, [mutLeiData])

	return (
		<div>
			<FiltroMutuarioLei data={[mutLeiData]} />
		</div>
	)
}
export default TabelaMutuarioLei

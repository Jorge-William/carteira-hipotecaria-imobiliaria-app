import getDocumentos from '../services/getDocumentos.service'
import { useState, useEffect } from 'react'
import getMutuarioById from '../services/getMutuarioById.service'
import AccordionDeDocumentos from './AccordionDeDocumentos'
import ExibirMutuario from './ExibirMutuario'
import Skeleton from 'react-loading-skeleton'

const DetalheMutuario = ({ id }) => {
	const [dados, setDados] = useState({})
	const [documentos, setDocumentos] = useState([])

	const callServices = async () => {
		// Posição 0 é o id do mutuário e a posição 17 é o tipo(L ou C)
		const documentos = await getDocumentos(id)
		const mutuario = await getMutuarioById(id)

		// console.log(mutuario);

		setDocumentos(documentos)
		setDados(mutuario)
	}

	useEffect(() => {
		callServices()
	}, [])

	console.log(dados)

	return !dados ? (
		<Skeleton count={10} />
	) : (
		<section className='mb-5'>
			<ExibirMutuario dados={dados} />
			<AccordionDeDocumentos documentos={documentos} />
		</section>
	)
}

export default DetalheMutuario

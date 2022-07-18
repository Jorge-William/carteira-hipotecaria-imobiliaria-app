import getDocumentos from '../services/getDocumentos.service'
import { useState, useEffect } from 'react'
import getMutuarioById from '../services/getMutuarioById.service'
import AccordionDeDocumentos from './AccordionDeDocumentos'
import ExibirMutuario from './ExibirMutuario'
import Skeleton from 'react-loading-skeleton'
import '../style/DetalheMutuario.css'
import { Link } from 'react-router-dom'

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

	// console.log(dados)

	return !dados ? (
		<Skeleton count={10} />
	) : (
		<section className='mb-5'>
			<section className='row d-inline-flex gap-1'>
				<div className='col-md'>
					<button
						className='btn btn-outline-primary crud-btn'
						data-bs-toggle='tooltip'
						data-bs-placement='top'
						title='Editar Mutuário'
					>
						<i class='bi bi-person-lines-fill'></i>
					</button>
				</div>
				<div className='col-md'>
					<Link to={`/mutuario/lei/adicionardocumento/${id}`}>
						<button
							className='btn btn-outline-success crud-btn'
							data-bs-toggle='tooltip'
							data-bs-placement='top'
							title='Adicionar documento'
						>
							<i class='bi bi-file-earmark-plus-fill'></i>
						</button>
					</Link>
				</div>
			</section>
			<ExibirMutuario dados={dados} />
			<AccordionDeDocumentos documentos={documentos} />
		</section>
	)
}

export default DetalheMutuario

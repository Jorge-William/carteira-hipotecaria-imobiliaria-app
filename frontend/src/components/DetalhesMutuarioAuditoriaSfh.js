import { useState, useEffect } from 'react'
import getMutuarioSfhById from '../services/getMutuarioSfhById.service'
import ExibirMutuarioSfh from './ExibirMutuarioSfh'
import Skeleton from 'react-loading-skeleton'
import '../style/DetalheMutuario.css'
import getDocumentosSfh from '../services/getDocumentosSfh.service'
import AccordionDeDocumentosAuditoriaSfh from './AccordionDeDocumentosAuditoriaSfh'

export default function DetalhesMutuarioAuditoriaSfh({ id }) {
	const [dados, setDados] = useState({})
	const [documentos, setDocumentos] = useState([])
	console.log(id);
	useEffect(() => {
		const callServices = async () => {
			// Posição 0 é o id do mutuário e a posição 17 é o tipo(L ou C)
			const documentos = await getDocumentosSfh(id)
			const mutuario = await getMutuarioSfhById(id)

			setDocumentos(documentos)
			setDados(mutuario)
		}
		callServices()
	}, [id])

	return !dados ? (
		<Skeleton count={10} />
	) : (
		<section className='mb-5'>
			{/* <section className='row d-inline-flex gap-1'>
				<div className='col-md'>
					<button
						className='btn btn-outline-primary crud-btn'
						data-bs-toggle='tooltip'
						data-bs-placement='top'
						title='Editar Mutuário'
					>
						<i className='bi bi-person-lines-fill'></i>
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
							<i className='bi bi-file-earmark-plus-fill'></i>
						</button>
					</Link>
				</div>
			</section> */}
			<ExibirMutuarioSfh dados={dados} />
			<AccordionDeDocumentosAuditoriaSfh documentos={documentos} />
		</section>
	)
}

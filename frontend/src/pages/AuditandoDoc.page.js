import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getDocAuditando } from '../services/getDocumentos.service'
export function AuditandoDoc() {
	const { id } = useParams()
	const [docData, setDocData] = useState()
    const [isLoading, setIsloading] = useState(true)

	console.log(docData)
	useEffect(() => {
		const callServices = async () => {
			const response = await getDocAuditando(id)

			const data = response[0]
			setDocData(data)
		}

		callServices()
        setIsloading(false)
	}, [id])

	return docData !== undefined ? (
		<section>
			<h1 className='mb-5'>Auditando doc</h1>
			<div style={{ height: '600px', width: '100%' }}>
				<embed
					src={
						process.env.NODE_ENV === 'production'
							? `http://10.100.1.156:5001/documentos/${docData.cod_pasta}/${docData.nome_arquivo}.pdf`
							: process.env.NODE_ENV === 'development'
							? `http://localhost:5001/documentos/${docData.cod_pasta}/${docData.nome_arquivo}.pdf`
							: 'http://localhost:3000/dashboard'
					}
					type='application/pdf'
					width={'100%'}
					height={'100%'}
				/>
			</div>
            <div>
                <ul>
                    <li>Pasta: {docData.cod_pasta}</li>
                </ul>
            </div>
		</section>
	) : (
        <div>
            <h1>Loading...</h1>
        </div>
    )
}

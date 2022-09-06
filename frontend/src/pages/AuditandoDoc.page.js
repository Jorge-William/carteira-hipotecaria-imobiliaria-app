import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getDocAuditando } from '../services/getDocumentos.service'
export function AuditandoDoc() {
	const { id } = useParams()
	const [docData, setDocData] = useState()
	const [isLoading, setIsloading] = useState(true)

	// console.log(id)
	useEffect(() => {
		const callServices = async () => {
			const response = await getDocAuditando(id)
			const data = response[0]
			setDocData(data)
		}

		callServices()
		setIsloading(false)
	}, [id])

	const listToCheck = [
		'Natureza da documentação',
		'Legibilidade',
		'Quantidade de páginas',
		'Nome do Mutuario',
		'Ordem das páginas',
		'Alinhamento do documento'
	]
	return docData !== undefined ? (
		<section>
			<h1 className='mb-5'>Auditando documento</h1>
			<div className='row'>
				<div className='col-sm-12 col-md-12 mb-5'>
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
				</div>
				<div className='col-sm-12 col-md-6'>
					<h3 className='mb-4'>Informações do documento</h3>
					<hr />
					<p>Pasta: {docData.cod_pasta}</p>
					<p>Mutuário: {docData.nome}</p>
					<p>Natureza do documento: {docData.descricao}</p>
					<p>Quantidade de páginas: {docData.qtd_pag}</p>
				</div>
				<div className='col-sm-12 col-md-6 mb-5'>
					<h3 className='mb-4'>Check-list</h3>
					<hr />

					{listToCheck.map((item, key) => (
						<div key={key} class='form-check'>
							<input
								class='form-check-input'
								type='checkbox'
								value=''
								id='flexCheckDefault'
							/>
							<label
								class='form-check-label'
								for='flexCheckDefault'
							>
								{item}
							</label>
						</div>
					))}
					<br />
					<div class='mb-3'>
						<label
							for='exampleFormControlInput1'
							class='form-label'
						>
							Outros:
						</label>
						<textarea
							type='text-area'
							class='form-control'
							id='exampleFormControlInput1'
							placeholder='Exemplo: Faltou escanear o verso do documento xyz'
						/>
					</div>
				</div>
			</div>
			<div className='row mb-5 d-flex justify-content-center'>
				<div className='col-md-2 d-flex justify-content-center'>
					<button type='button' className='btn btn-success mb-5'>
						Salvar audição
					</button>
				</div>
			</div>
		</section>
	) : (
		<div>
			<h1>Loading...</h1>
		</div>
	)
}

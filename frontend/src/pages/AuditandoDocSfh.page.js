import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDocAuditandoSfh } from '../services/getDocumentosSfh.service'
import Swal from 'sweetalert2'
import axios from 'axios'

export function AuditandoDocSfh() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [docData, setDocData] = useState()
	// const [isLoading, setIsloading] = useState(true)
	const [observacao, setObservacao] = useState({ observacao: '' })
	// console.log(docData)
	let userInfo = null
	userInfo = JSON.parse(localStorage.getItem('userData'))
	const { id: usuario_id } = userInfo
	const [checklist, setChecklist] = useState([
		{ id: 1, prop: 'Natureza do documento', status: false },
		{ id: 2, prop: 'Legibilidade', status: false },
		{ id: 3, prop: 'Quantidade de páginas', status: false },
		{ id: 4, prop: 'Nome do mutuário', status: false },
		{ id: 5, prop: 'Ordem páginas', status: false },
		{ id: 6, prop: 'Alinhamento do documento', status: false },
		{ id: 7, prop: 'Informações do Verso', status: false }
	])

	// const filtraAudicao = (checklist) => {
	// 	const itensOk = checklist.filter((item) => {
	// 		return item.status === true
	// 	})
	// 	return console.log(itensOk)
	// }

	useEffect(() => {
		const callServices = async () => {
			const response = await getDocAuditandoSfh(id)

			const data = response[0]
			// console.log(data)
			setDocData(data)
		}

		callServices()
		// setIsloading(false)
	}, [id])

	const onCheck = (id) => {
		setChecklist(
			checklist.map((item) =>
				item.id === id ? { ...item, status: !item.status } : item
			)
		)
	}

	const handleClick = () => {
		Swal.fire({
			title: 'Atenção!',
			text: 'Deseja salvar a audição?',
			icon: 'question',
			showCancelButton: true,
			cancelButtonText: 'Cancelar',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim, salvar!',
			showLoaderOnConfirm: true,
			preConfirm: () => {
				return axios
					.post('/audicao-sfh', {
						params: {
							docData,
							observacao,
							checklist,
							usuario_id
						}
					})
					.then((response) => {
						if (response.statusText === 'OK') {
							Swal.fire({
								icon: 'success',
								title: 'Tudo certo!',
								text: 'A audição foi salva com sucesso!'
								// footer: '<a href="">Why do I have this issue?</a>'
							})
							return navigate(`/detalhes-auditoria-sfh/${docData.mutuario_id}`, {
								replace: true
							})
						}
						throw new Error(response.statusText)
					})
					.catch((error) => {
						Swal.showValidationMessage(
							`A requisição falhou: ${error}`
						)
					})
			},
			allowOutsideClick: () => !Swal.isLoading()
		})
	}

	const handleChange = (event) => {
		const value = event.target.value

		setObservacao({
			...observacao,
			[event.target.name]: value
		})
	}

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
					<small className='text-secondary'>
						Marque os itens que estão ok
					</small>

					{checklist.map((item, key) => (
						<div key={key} class='form-check'>
							<input
								name={item}
								key={key}
								class='form-check-input'
								type='checkbox'
								id='flexCheckDefault'
								checked={item.status}
								onChange={() => onCheck(item.id)}
							/>
							<label
								class='form-check-label'
								htmlFor='flexCheckDefault'
							>
								{item.prop}
							</label>
						</div>
					))}
					<br />
					<div class='mb-3'>
						<label
							htmlFor='exampleFormControlInput1'
							class='form-label'
						>
							Outros:
						</label>
						<textarea
							type='text-area'
							class='form-control'
							id='exampleFormControlInput1'
							placeholder='Exemplo: Faltou escanear o verso do documento xyz'
							onChange={handleChange}
							name='observacao'
						/>
					</div>
				</div>
			</div>
			<div className='row mb-5 d-flex justify-content-center'>
				<div className='col-md-2 d-flex justify-content-center'>
					<button
						type='button'
						className='btn btn-success mb-5'
						onClick={handleClick}
					>
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

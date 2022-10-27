import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSubstituirDocumentoLei from '../components/FormSubstituirDocumentoLei'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SubstituirDocumentoLeiPage = () => {
	const { id } = useParams()

	const [data, setData] = useState({})

	useEffect(() => {
		const fetchData = async (id) => {
			const result = await axios
				.post('/cabecalhodocumento', { params: { id } })
				.then((result) => result.data)
				.catch((error) => {
					if (error.response) {
						console.log(error.response.data)
						console.log(error.response.status)
						console.log(error.response.headers)
					} else if (error.request) {
						console.log(error.request)
					}
				})

			setData(result)
		}

		fetchData(id)
	}, [id])

	return (
		<section>
			<div className='d-flex justify-content-between'>
				<div className='col-md'>
					<h2>Substituir documento Lei</h2>
				</div>
				<div className='col-md'>
					<button className='btn btn-secondary float-end'>
						<Link to={`/operador`}>
							<i className='bi bi-arrow-left'></i>Voltar
						</Link>
					</button>
				</div>
			</div>
			<FormSubstituirDocumentoLei dados={data} />
		</section>
	)
}

export default SubstituirDocumentoLeiPage

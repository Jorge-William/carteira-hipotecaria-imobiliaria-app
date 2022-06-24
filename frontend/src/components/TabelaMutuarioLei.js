import React from 'react'
import getMutuariosLei from '../services/getMutuarios.service'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const TabelaMutuarioLei = () => {
	const [mutLeiData, setMutLeiData] = useState([])
	const [isLoading, setLoading] = useState(true)

	const fetchMutuarios = () => {
		getMutuariosLei().then((mutuario) => setMutLeiData(mutuario))
		setLoading(false)
	}
	useEffect(() => {
		console.log('Carregou!')
		setTimeout(() => {
			fetchMutuarios()
		}, 5000)
	}, [])

	return isLoading ? (
		<Skeleton count={20} />
	) : (
		<div>
			<table className='table table-striped table-bordered'>
				<thead>
					<tr>
						<th scope='col'>Pasta</th>
						<th scope='col'>Nome</th>
						<th scope='col'>Endreço</th>
						<th scope='col'>Nº</th>
						<th scope='col'>Complemento</th>
						<th scope='col'>Bairro</th>
						<th scope='col'>Cidade</th>
						<th scope='col'>UF</th>
						<th scope='col'>Esc</th>
						<th scope='col'>Hip</th>
					</tr>
				</thead>
				<tbody>
					{mutLeiData?.map((data) => {
						return (
							<tr key={data.id}>
								<th scope='row'>{data.rotulo}</th>
								<td>{data.nome}</td>
								<td>{data.imoveis_leis[0].end}</td>
								<td>{data.imoveis_leis[0].numero}</td>
								<td>{data.imoveis_leis[0].complemento}</td>
								<td>{data.imoveis_leis[0].bairro}</td>
								<td>{data.imoveis_leis[0].cidade}</td>
								<td>{data.imoveis_leis[0].uf}</td>
								<td>{data.imoveis_leis[0].escritura}</td>
								<td>{data.imoveis_leis[0].hipoteca}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
export default TabelaMutuarioLei

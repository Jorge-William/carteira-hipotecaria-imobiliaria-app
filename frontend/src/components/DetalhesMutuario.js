import getDocumentos from '../services/getDocumentos.service'
import { useState, useEffect } from 'react'
import getMutuarioById from '../services/getMutuarioById.service'
import Skeleton from 'react-loading-skeleton'

const DetalheMutuario = ({ id }) => {
	const [dados, setDados] = useState(null)
	const [documentos, setDocumentos] = useState(null)

	const callServices = async () => {
		// Posição 0 é o id do mutuário e a posição 17 é o tipo(L ou C)
		const documentos = await getDocumentos(id)
        const mutuario = await getMutuarioById(id)

		setDocumentos(documentos)
        setDados(mutuario)
	}

	useEffect(() => {
		callServices()
	})

	return (
		!dados ? (<Skeleton count={10}/>) : (<div>
			<h4>Detalhes Component {id}</h4>
			<div className='container'>
				<div className='row justify-content-center'>
					<div className='mt-3 mb-5 col-4 text-center'>
						<h3>{dados.nome}</h3>
					</div>
				</div>
				{/* <hr /> */}
				<div className='container'>
					<div className='row  justify-content-center'>
						<div className='col-8 mb-5'>
							<div className='row mt-3 mb-5'>
								<div className='col-4'>
									<strong>Pasta: </strong>
									{dados.rotulo}
								</div>
								<div className='col-4'>
									<strong>Telefone: </strong>
									{dados.imoveis_leis[0].telefone}
								</div>
								<div className='col-4'>Tipo Lei</div>
							</div>
							<h4>Imóvel</h4>
							<div className='row mt-5'>
								<div className='col'>
									<strong>Data de liquidação:</strong>{' '}
									{dados.imoveis_leis[0].dt_liq}
								</div>
								<div className='col'>
									<strong>Escritura: </strong>
									{dados.imoveis_leis[0].escritura === 1 ? (
										<p>Sim</p>
									) : (
										<p>Não</p>
									)}
								</div>
								<div className='col'>
									<strong>Hipoteca: </strong>
									{dados.imoveis_leis[0].hipoteca === 1 ? (
										<p>Sim</p>
									) : (
										<p>Não</p>
									)}
								</div>
							</div>
							<div className='row mt-3'>
								<div className='col'>
									<strong>Número da obra: </strong>
									{dados.imoveis_leis[0].num_obra}
								</div>
								<div className='col'>
									<strong>Código Histórico: </strong>
									{dados.imoveis_leis[0].cod_historico}
								</div>
								<div className='col'>
									<strong>Observação: </strong>
									{dados.imoveis_leis[0].obs}
								</div>
							</div>
							<div className='row mt-3'>
								<div className='col-6'>
									<strong>Endereço:</strong>{' '}
									{dados.imoveis_leis[0].end}
								</div>
								<div className='col'>
									<strong>Número:</strong>{' '}
									{dados.imoveis_leis[0].numero}
								</div>
								<div className='col'>
									<strong>CEP:</strong>{' '}
									{dados.imoveis_leis[0].cep}
								</div>
							</div>
							<div className='row mt-3'>
								<div className='col'>
									<strong>Bairro:</strong>{' '}
									{dados.imoveis_leis[0].bairro}
								</div>
								<div className='col'>
									<strong>Comp:</strong>{' '}
									{dados.imoveis_leis[0].complemento}
								</div>
								<div className='col'>
									<strong>Cidade: </strong>
									{dados.imoveis_leis[0].cidade}
								</div>
								<div className='col'>
									<strong>UF: </strong>
									{dados.imoveis_leis[0].uf}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>)
        (!documentos ? (<Skeleton count={10} />) :( <h3>Deu certo!!</h3>))
	)
}

export default DetalheMutuario

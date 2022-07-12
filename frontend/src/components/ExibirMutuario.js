import Skeleton from 'react-loading-skeleton'
// import { useState, useEffect } from 'react';

const ExibirMutuario = ({ dados }) => {
	return !dados ? (
		<Skeleton count={10} />
	) : (
		<div>
			<div className='container'>
				<div className='row justify-content-center'>
					<div className='mt-3 mb-2 col-4 text-center'>
						<h1>{dados.result?.[0].nome}</h1>
					</div>
				</div>
				<hr />
				<div className='container'>
					<div className='row  justify-content-center'>
						<div className='col-8 mb-5'>
							<div className='row mt-3 mb-5'>
								<div className='col-4'>
									<strong>Pasta: </strong>
									{dados.result?.[0].rotulo}
								</div>
								<div className='col-4'>
									<strong>Telefone: </strong>
									{dados.result?.[0].telefone}
								</div>
								<div className='col-4'>Tipo Lei</div>
							</div>
							<h4>Imóvel</h4>
							<div className='row mt-5'>
								<div className='col'>
									<strong>Data de liquidação:</strong>{' '}
									{dados.result?.[0].dt_liq}
								</div>
								<div className='col'>
									<strong>Escritura: </strong>
									{dados.result?.[0].escritura === 1 ? (
										<p>Sim</p>
									) : (
										<p>Não</p>
									)}
								</div>
								<div className='col'>
									<strong>Hipoteca: </strong>
									{dados.result?.[0].hipoteca === 1 ? (
										<p>Sim</p>
									) : (
										<p>Não</p>
									)}
								</div>
							</div>
							<div className='row mt-3'>
								<div className='col'>
									<strong>Número da obra: </strong>
									{dados.result?.[0].num_obra}
								</div>
								<div className='col'>
									<strong>Código Histórico: </strong>
									{dados.result?.[0].cod_historico}
								</div>
								<div className='col'>
									<strong>Observação: </strong>
									{dados.result?.[0].obs}
								</div>
							</div>
							<div className='row mt-3'>
								<div className='col-6'>
									<strong>Endereço:</strong>{' '}
									{dados.result?.[0].end}
								</div>
								<div className='col'>
									<strong>Número:</strong>{' '}
									{dados.result?.[0].numero}
								</div>
								<div className='col'>
									<strong>CEP:</strong>{' '}
									{dados.result?.[0].cep}
								</div>
							</div>
							<div className='row mt-3'>
								<div className='col'>
									<strong>Bairro:</strong>{' '}
									{dados.result?.[0].bairro}
								</div>
								<div className='col'>
									<strong>Comp:</strong>{' '}
									{dados.result?.[0].complemento}
								</div>
								<div className='col'>
									<strong>Cidade: </strong>
									{dados.result?.[0].cidade}
								</div>
								<div className='col'>
									<strong>UF: </strong>
									{dados.result?.[0].uf}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ExibirMutuario

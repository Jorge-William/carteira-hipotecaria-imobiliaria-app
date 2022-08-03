import React, { useState, useEffect } from 'react'
import getInfoCards from '../services/getInfoCards.service'
import '../style/info-cards.css'
import Skeleton from 'react-loading-skeleton'
import AnimatedNumber from 'animated-number-react'

const InfoCards = () => {
	const [infoMutuarios, setInfoMutuarios] = useState({
		metadataLei: [
			{
				qtd_mutuarios_lei: 0
			}
		],
		metadataSfh: [
			{
				qtd_mutuarios_sfh: 0
			}
		]
	})

	// console.log(infoMutuarios)
	// console.log(infoMutuarios.data.lei[0].qtd_mutuarios_lei);

	useEffect(() => {
		const callServices = async () => {
			const result = await getInfoCards()
			setInfoMutuarios({ ...result })
		}
		callServices()
	}, [])
	// console.log(infoMutuarios)

	const total =
		infoMutuarios.metadataLei[0].qtd_mutuarios_lei +
		infoMutuarios.metadataSfh[0].qtd_mutuarios_sfh

	const totalLei = infoMutuarios.metadataLei[0].qtd_mutuarios_lei
	const totalSfh = infoMutuarios.metadataSfh[0].qtd_mutuarios_sfh
	return (
		<div className='row mt-5 d-flex justify-content-center gap-2 mx-auto'>
			{!infoMutuarios ? (
				<Skeleton count={10} />
			) : (
				<div className='col-lg-6' id='card-principal'>
					<div className=''>
						<h1 className='p-3 titulo'>Total de mutuários</h1>
						<div className='row d-inline-flex'>
							<div className='col-md d-inline-flex'>
								<i
									className='ms-2 bi bi-people text-success'
									id='icone-card-principal'
								></i>
							</div>
							<div className='col-lg'>
								<p className='numero text-secondary'>
									<AnimatedNumber
										value={total}
										formatValue={(total) => total.toFixed()}
									/>
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className='col-lg-6'>
				<div className='row gap-2 d-flex'>
					<div className='col-md-12 p-3' id='secundario-um'>
						<div className='row mx-auto'>
							<div className='col-md-6'>
								<div className='row mt-2  align-items-center'>
									<h3 className='titulos-card-um'>
										Mutuarios Lei
									</h3>
								</div>
								<div className='row gap-5 mt-3 d-inline-flex '>
									<i
										className='bi bi-person-badge  d-flex justify-content-center text-primary'
										id='icone-card-um'
									></i>
									<p className='numero-card-um text-warning   d-flex justify-content-center '>
										<AnimatedNumber
											value={totalLei}
											formatValue={(totalLei) =>
												totalLei.toFixed()
											}
										/>
									</p>
								</div>
							</div>
							<div className='col-md-6'>
								<div className='row mt-2  align-items-center'>
									<h3 className='titulos-card-um'>
										Mutuarios Sfh
									</h3>
								</div>
								<div className='row gap-5 mt-3 d-inline-flex '>
									<i
										className='bi bi-person-badge-fill  d-flex justify-content-center text-success'
										id='icone-card-um'
									></i>

									<p className='numero-card-um text-warning  d-flex justify-content-center'>
										<AnimatedNumber
											value={totalSfh}
											duration={2000}
											formatValue={(totalSfh) =>
												totalSfh.toFixed()
											}
										/>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className='col-md-12' id='secundario-dois'>
						<div className='row mx-auto'>
							<div className='col-md-6'>
								<div className='row mt-2  align-items-center'>
									<h3 className='titulos-card-um'>
										Documentos Auditados
									</h3>
								</div>
								<div className='row gap-5 mt-3 d-inline-flex '>
									<i
										className='bi bi-file-earmark-check d-flex justify-content-center text-success'
										id='icone-card-um'
									></i>
									<p className='numero-card-um   d-flex justify-content-center'>
										{/* {
											infoMutuarios.data.lei[0]
												.qtd_mutuarios_lei
										} */}
									</p>
								</div>
							</div>
							<div className='col-md-6'>
								<div className='row mt-2  align-items-center'>
									<h3 className='titulos-card-um'>
										Documentos Não Auditados
									</h3>
								</div>
								<div className='row gap-5 mt-3 d-inline-flex '>
									<i
										className='bi bi-file-earmark-excel d-flex justify-content-center text-danger'
										id='icone-card-um'
									></i>

									<p className='numero-card-um  d-flex justify-content-center'>
										{/* {
											infoMutuarios.data.sfh[0]
												.qtd_mutuarios_sfh
										} */}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default InfoCards

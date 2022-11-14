import React, { useState, useEffect } from 'react'
import getInfoCards from '../services/getInfoCards.service'
import '../style/info-cards.css'
// import Skeleton from 'react-loading-skeleton'
import AnimatedNumber from 'animated-number-react'

const InfoCards = () => {
	const [infoMutuarios, setInfoMutuarios] = useState({
		docsAuditados: 0,
		docsNaoAuditados: 0,
		totalMutLei: 0,
		totalMutSfh: 0,
		totalMutuarios: 0
	})

	console.log(infoMutuarios)
	useEffect(() => {
		const callServices = async () => {
			const result = await getInfoCards()
			setInfoMutuarios({ ...result })
		}
		callServices()
	}, [])

	// <AnimatedNumber
	// 	value={totalSfh}
	// 	duration={2000}
	// 	formatValue={(totalSfh) => totalSfh.toFixed()}
	// />
	const {
		docsAuditados,
		docsNaoAuditados,
		totalMutLei,
		totalMutSfh,
		totalMutuarios
	} = infoMutuarios

	return (
		<div className='container gy-2 p-3'>
			<div className='row row-cols-1 row-cols-lg-3 mb-2 justify-content-center'>
				<div className='col m-3 cards'>
					<div className='p-5 border-bottom'>
						<h2 className='text-secondary'>Total de Mutuários</h2>
					</div>
					<div className='text-center'>
						<p className='text-secondary number'>
							<AnimatedNumber
								value={totalMutuarios}
								duration={2000}
								formatValue={(totalMutuarios) =>
									totalMutuarios.toFixed()
								}
							/>
						</p>
					</div>
				</div>
				<div className='col m-3 cards'>
					<div className='p-5 border-bottom'>
						<h2 className='text-secondary'>
							Mutuários
							<br /> Lei
						</h2>
					</div>
					<div className='text-center'>
						<p className='text-primary number'>
							<AnimatedNumber
								value={totalMutLei}
								duration={2000}
								formatValue={(totalMutLei) =>
									totalMutLei.toFixed()
								}
							/>
						</p>
					</div>
				</div>
				<div className='col m-3 cards'>
					<div className='p-5 border-bottom'>
						<h2 className='text-secondary'>
							Mutuários
							<br /> SFH
						</h2>
					</div>
					<div className='text-center'>
						<p className='text-warning number'>
							<AnimatedNumber
								value={totalMutSfh}
								duration={2000}
								formatValue={(totalMutSfh) =>
									totalMutSfh.toFixed()
								}
							/>
						</p>
					</div>
				</div>
			</div>
			<div className='row g-3 justify-content-center'>
				<div className='col-6 m-3 card-maior ps-4 pe-4'>
					<div className='p-5 border-bottom'>
						<h2 className='text-secondary'>
							Documentos
							<br /> Auditados
						</h2>
					</div>
					<div className='text-center'>
						<p className='text-success number text-end'>
							<AnimatedNumber
								value={docsAuditados}
								duration={2000}
								formatValue={(docsAuditados) =>
									docsAuditados.toFixed()
								}
							/>
						</p>
					</div>
				</div>
				<div className='col-6 m-3 card-maior ps-4 pe-4'>
					<div className='p-5 border-bottom'>
						<h2 className='text-secondary'>
							Documentos não Auditados
						</h2>
					</div>
					<div className='text-center'>
						<p className='text-danger number text-end'>
							<AnimatedNumber
								value={docsNaoAuditados}
								duration={2000}
								formatValue={(docsNaoAuditados) =>
									docsNaoAuditados.toFixed()
								}
							/>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default InfoCards

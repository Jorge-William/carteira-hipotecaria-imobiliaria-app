import '../style/DashboardAuditoria.css'
import AnimatedNumber from 'animated-number-react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export function DashboardAuditoria({ tipo }) {
	const [tipoMutuario, setTipoMutuario] = useState('')
	const [dados, setDados] = useState({
		docsNaoAuditados: {
			naoAuditados: 0
		},
		docsAuditados: {
			auditados: 0
		},
		docPendentes: {
			pendentes: 0
		},
		docTotal: {
			total: 0
		}
	})
	// console.log(dados);
	const getEstatisticas = (tipo) => {
		if (tipo === 'lei') {
			return axios
				.get('/dashboard-lei')
				.then((response) => {
					return response.data
				})
				.then((response) => {
					setDados(response)
				})
		}
		return axios
			.get('/dashboard-sfh')
			.then((response) => {
				return response.data
			})
			.then((response) => {
				setDados(response)
			})
	}

	useEffect(() => {
		setTipoMutuario(tipo)

		getEstatisticas(tipo).then()
	}, [tipoMutuario, tipo])

	return (
		<section>
			<h3>Estatística {tipo}</h3>
			<div className='mt-5 row d-flex gap-3 justify-content-center'>
				<div className='p-2 card-dashboard col-xs-2 col-md-2 col-sm-6'>
					<h5>Total</h5>
					<p>
						<AnimatedNumber
							value={dados.docTotal.total}
							formatValue={(total) => total.toFixed()}
						/>
					</p>
				</div>
				<div className='p-2 card-dashboard col-xs-2 col-md-2 col-sm-6'>
					<h5>Pendentes</h5>
					<p>
						<AnimatedNumber
							value={dados.docPendentes.pendentes}
							formatValue={(total) => total.toFixed()}
						/>
					</p>
				</div>
				<div className='p-2 card-dashboard col-xs-2 col-md-2 col-sm-6'>
					<h5>Não auditados</h5>
					<p>
						<AnimatedNumber
							value={dados.docsNaoAuditados.naoAuditados}
							formatValue={(total) => total.toFixed()}
						/>
					</p>
				</div>
				<div className='p-2 card-dashboard col-xs-2 col-md-2 col-sm-6'>
					<h5>Auditados</h5>
					<p>
						<AnimatedNumber
							value={dados.docsAuditados.auditados}
							formatValue={(total) => total.toFixed()}
						/>
					</p>
				</div>
			</div>
		</section>
	)
}

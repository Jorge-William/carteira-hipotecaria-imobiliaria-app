import '../style/DashboardAuditoria.css'
import AnimatedNumber from 'animated-number-react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export function DashboardAuditoria({ tipo }) {
	const [tipoMutuario, setTipoMutuario] = useState('')
	const [dados, setDados] = useState('')

	const getEstatisticas = (tipo) => {
		if (tipo === 'lei') {
			return axios.get('/dashboard-lei').then((response) => {
                return response.data
            }).then((response) =>{
				setDados(response.result[0])
            })
		}
		return axios.get('/dashboard-sfh').then((response) => {
            return response.data
        }).then((response) =>{
            setDados(response.result[0])
        
		})
	}

	useEffect(() => {
		setTipoMutuario(tipo)

		getEstatisticas(tipo).then()
	}, [tipoMutuario, tipo])

	return (
		<section>
			<h3>Estatística LEI</h3>
			<div className='mt-5 row d-flex gap-3 justify-content-center'>
				<div className='p-2 card-dashboard col-xs-2 col-md-2 col-sm-6'>
					<h5>Total</h5>
					<p>
						<AnimatedNumber
							value={2233}
							formatValue={(total) => total.toFixed()}
						/>
					</p>
				</div>
				<div className='p-2 card-dashboard col-xs-2 col-md-2 col-sm-6'>
					<h5>Pendentes</h5>
					<p>
						<AnimatedNumber
							value={3445}
							formatValue={(total) => total.toFixed()}
						/>
					</p>
				</div>
				<div className='p-2 card-dashboard col-xs-2 col-md-2 col-sm-6'>
					<h5>Não auditados</h5>
					<p>
						<AnimatedNumber
							value={dados.naoAuditados}
							formatValue={(total) => total.toFixed()}
						/>
					</p>
				</div>
				<div className='p-2 card-dashboard col-xs-2 col-md-2 col-sm-6'>
					<h5>Auditados</h5>
					<p>
						<AnimatedNumber
							value={6887}
							formatValue={(total) => total.toFixed()}
						/>
					</p>
				</div>
			</div>
		</section>
	)
}

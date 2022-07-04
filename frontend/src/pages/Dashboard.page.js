import React from 'react'
import '../style/Dashboard.css'

const Dashboard = () => {
	return (
		<section>
			<h1>Dashboard</h1>
			<p className='border'>
				No codigo acima o React invoca o método evento quando você clica
				na string, mas não lhe dará acesso à instância do componente
				dentro dela fazendo com que você receba um undefinedna sua cara
				quando você clicar na string. Esse é um problema se seu método
				de classe precisa ter acesso a coisas como this.props e
				this.state. Isso simplesmente não irá funcionar do jeito que
				você imagina. Calma, existem varias solucoes para esse problema.
				Você pode abraçar o método em uma função inline ou usar a
				chamada .bind para forçar o método a lembrar quem o chamou.
				Essas são soluções ok se seus componentes não são atualizados
				tão frequentemente. Você pode também otimizar o método bind do
				JavaScript chamando ele lá no construtor da classe do seu
				componente ao invés de fazer isso no método render que é chamado
				constantemente.
			</p>
		</section>
	)
}

export default Dashboard

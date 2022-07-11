import ExibirMutuarioLei from './modal/ExibirMutuarioLei.modal'

const LinkMutuario = ({ pasta, mutuario, values }) => {
	// const handleClick = async (mutuario) => {
	// 	const result = await getMutuarioLei(mutuario)
	// 	return setResult(result)
	// }
	return (
		<>
			<a
				data-bs-toggle='modal'
				data-bs-target={'#' + pasta}
				className='link'
				data-bs-placement='top'
				title='Clique para detalhes'
				// onClick={() => editarNome()}
			>
				{mutuario}
			</a>
			<ExibirMutuarioLei id={pasta} dados={values} />
		</>
	)
}

export default LinkMutuario

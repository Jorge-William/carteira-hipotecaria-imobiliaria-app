import ExibirMutuarioLei from './modal/JanelaMutuarioLei.modal'

const LinkMutuario = ({ mutuario, pasta }) => {
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
				// onClick={() => editarNome()}
			>
				{mutuario}
			</a>
			<ExibirMutuarioLei mutuario={mutuario} id={pasta} />
		</>
	)
}

export default LinkMutuario

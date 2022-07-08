const renderSwitch = (status) => {
	switch (status) {
		case '0':
			return (
				<p className='ms-2' style={{ color: 'orange' }}>
					<i
						class='bi bi-exclamation-triangle-fill'
						style={{ fontSize: 28 }}
					></i>
				</p>
			)
		case '1':
			return <p style={{ color: 'grey' }}>Não auditado</p>
		case '3':
			return (
				<p className='ms-2' style={{ color: 'green' }}>
					<i
						class='bi bi-patch-check-fill'
						style={{ fontSize: 28 }}
					></i>
				</p>
			)
		default:
	}
}

export default renderSwitch

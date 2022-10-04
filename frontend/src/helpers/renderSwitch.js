const renderSwitch = (status) => {
	switch (status) {
		case '0':
			return (
				<p className='ms-2' style={{ color: 'red' }}>
					<i
						class='bi bi-exclamation-triangle-fill'
						style={{ fontSize: 28 }}
					></i>
				</p>
			)
		case '10':
			return (
				<p className='ms-2' style={{ color: 'grey' }}>
					<i
						class='bi bi-patch-exclamation-fill'
						style={{ fontSize: 28 }}
					></i>
				</p>
			)
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

const renderSwitch = (status) => {
	switch (status) {
		case '0':
			return (
				<p className='ms-2' style={{ color: 'red' }}>
					<i
						className='bi bi-exclamation-triangle-fill'
						style={{ fontSize: 28 }}
					></i>
				</p>
			)
		case '10':
			return (
				<p className='ms-2' style={{ color: 'grey' }}>
					<i
						className='bi bi-patch-exclamation-fill'
						style={{ fontSize: 28 }}
					></i>
				</p>
			)
		case '3':
			return (
				<p className='ms-2' style={{ color: 'green' }}>
					<i
						className='bi bi-patch-check-fill'
						style={{ fontSize: 28 }}
					></i>
				</p>
			)
		default:
	}
}

export default renderSwitch

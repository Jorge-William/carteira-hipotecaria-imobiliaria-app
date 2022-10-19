const acertoData = (data) => {
	//         var date = new Date(data);
	// return date.toISOString().substring(0, 11);
	const date = new Date(data)
	return (
		(date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()) +
		'/' +
		(date.getMonth() + 1 < 10
			? `0${date.getMonth() + 1}`
			: date.getMonth() + 1) +
		'/' +
		date.getFullYear() +
		' ' +
		date.getHours() +
		':' +
		(date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()) +
		':' +
		(date.getSeconds() <= 9 ? `0${date.getSeconds()}` : date.getSeconds())
	) //prints expected format.
}

export default acertoData

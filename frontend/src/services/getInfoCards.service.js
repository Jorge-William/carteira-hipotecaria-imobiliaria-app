import axios from 'axios'

const getInfoCards = async () => {
	return axios
		.get('/info-mutuarios')
		.then((result) => result.data)
		.catch((error) => {
			if (error.response) {
				console.log(error.response.data)
				console.log(error.response.status)
				console.log(error.response.headers)
			} else if (error.request) {
				console.log(error.request)
			}
		})
}

export default getInfoCards

import { CONSTANTS } from './constants'
import axios from 'axios'

export default async function handler(req, res) {
	if (req.method === CONSTANTS.POST) {
		await axios.post(`${CONSTANTS.NUTRIENTS_URL}.json`, req.body)
		res.status(200).json()
	}
}

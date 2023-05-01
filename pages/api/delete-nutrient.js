import { CONSTANTS } from './constants'
import axios from 'axios'

export default async function handler(req, res) {
	if (req.method === CONSTANTS.DELETE) {
		await axios.delete(`${CONSTANTS.NUTRIENTS_URL}/${req.body.id}.json`)
		res.status(200).json()
	}
}

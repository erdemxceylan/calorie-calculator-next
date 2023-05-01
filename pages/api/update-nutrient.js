import { CONSTANTS } from './constants'
import axios from 'axios'

export default async function handler(req, res) {
	if (req.method === CONSTANTS.PUT) {
		await axios.put(`${CONSTANTS.NUTRIENTS_URL}/${req.body.id}.json`, {
			name: req.body.name,
			unit: req.body.unit,
			calories: req.body.calories,
			proteins: req.body.proteins,
		})
		res.status(200).json()
	}
}

import axios from 'axios';
import { CONSTANTS } from './constants';

export default function handler(req, res) {
   if (req.method === CONSTANTS.PUT) {
      axios.put(`${CONSTANTS.NUTRIENTS_URL}/${req.body.id}.json`, {
         name: req.body.name,
         unit: req.body.unit,
         calories: req.body.calories,
         proteins: req.body.proteins,
      });
      res.status(200).json();
   }
}
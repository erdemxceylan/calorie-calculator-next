import axios from 'axios';
import { CONSTANTS } from './constants';

export default function handler(req, res) {
   if (req.method === CONSTANTS.DELETE) {
      axios.delete(`${CONSTANTS.NUTRIENTS_URL}/${req.body.id}.json`);
      res.status(200).json();
   }
}
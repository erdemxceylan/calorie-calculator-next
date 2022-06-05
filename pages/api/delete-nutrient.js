import axios from 'axios';
import { CONSTANTS } from './constants';

export default function handler(req, res) {
   if (req.method === CONSTANTS.DELETE) {
      axios.delete(`${CONSTANTS.BASE_URL}/${CONSTANTS.NUTRIENTS}/${req.body.id}.json`);
      res.status(200).json();
   }
}
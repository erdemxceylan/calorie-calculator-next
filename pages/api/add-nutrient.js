import axios from 'axios';
import { CONSTANTS } from './constants';

export default function handler(req, res) {
   if (req.method === CONSTANTS.POST) {
      axios.post(`${CONSTANTS.BASE_URL}/${CONSTANTS.NUTRIENTS}.json`, req.body);
      res.status(200).json();
   }
}
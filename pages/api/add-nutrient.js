import axios from 'axios';
import { CONSTANTS } from './constants';

export default function handler(req, res) {
   if (req.method === CONSTANTS.POST) {
      axios.post(`${CONSTANTS.NUTRIENTS_URL}.json`, req.body);
      res.status(200).json();
   }
}
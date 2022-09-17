import axios from 'axios';
import { CONSTANTS } from './constants';

export default async function handler(req, res) {
   if (req.method === CONSTANTS.PUT) {
      await axios.put(`${CONSTANTS.SETTINGS_URL}/${CONSTANTS.DATA_SETTINGS_KEY}.json`, req.body);
      res.status(200).json();
   }
}
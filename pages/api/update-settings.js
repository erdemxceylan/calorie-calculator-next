import axios from 'axios';
import { CONSTANTS } from './constants';

export default function handler(req, res) {
   if (req.method === CONSTANTS.PUT) {
      axios.put(
         `${CONSTANTS.BASE_URL}/${CONSTANTS.SETTINGS}/${CONSTANTS.DATA_SETTINGS_KEY}.json`,
         req.body
      );
      res.status(200).json();
   }
}
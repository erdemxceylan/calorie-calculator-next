import axios from 'axios';
import { CONSTANTS } from './constants';

export default async function handler(req, res) {
   if (req.method === CONSTANTS.POST) {
      const url = req.body.isLoggingIn ? CONSTANTS.SIGN_IN_URL : CONSTANTS.SIGN_UP_URL;
      const body = {
         email: req.body.email,
         password: req.body.password,
         returnSecureToken: true
      };
      const response = await axios.post(url, body);
      res.status(200).json(response.data);
   }
}
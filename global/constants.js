const WEB_API_KEY = 'AIzaSyCayV-EV6nQ6yPmmyoxp8FaYswze90k_QA';
const SIGN_UP_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const SIGN_IN_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

export const CONSTANTS = {
   HOME_PAGE: '/',
   NUTRIENTS_PAGE: '/nutrients',
   ADD_NUTRIENT_URL: '/api/add-nutrient',
   DELETE_NUTRIENT_URL: '/api/delete-nutrient',
   UPDATE_NUTRIENT_URL: '/api/update-nutrient',
   UPDATE_SETTINGS_URL: '/api/update-settings',
   SIGN_UP_URL: SIGN_UP_BASE_URL + WEB_API_KEY,
   SIGN_IN_URL: SIGN_IN_BASE_URL + WEB_API_KEY,
   ADMIN: 'admin@test.com',
   WEIGHT_GAIN: 'Weight Gain',
   WEIGHT_LOSS: 'Weight Loss',
   GET: 'GET',
   POST: 'POST',
   PUT: 'PUT',
   DELETE: 'DELETE'
};
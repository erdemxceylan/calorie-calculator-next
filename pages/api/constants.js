const BASE_URL = 'https://graduation-project-7c908-default-rtdb.europe-west1.firebasedatabase.app'
const NUTRIENTS = 'nutrients'
const SETTINGS = 'settings'
const SIGN_UP_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
const SIGN_IN_BASE_URL =
	'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
const WEB_API_KEY = 'AIzaSyCayV-EV6nQ6yPmmyoxp8FaYswze90k_QA'

export const CONSTANTS = {
	NUTRIENTS_URL: `${BASE_URL}/${NUTRIENTS}`,
	SETTINGS_URL: `${BASE_URL}/${SETTINGS}`,
	DATA_SETTINGS_KEY: '-Mx0iqZtr4x7XfhxV-wW',
	SIGN_UP_URL: SIGN_UP_BASE_URL + WEB_API_KEY,
	SIGN_IN_URL: SIGN_IN_BASE_URL + WEB_API_KEY,
	WEIGHT_GAIN: 'Weight Gain',
	WEIGHT_LOSS: 'Weight Loss',
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
}

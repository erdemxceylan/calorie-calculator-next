import { configureStore } from '@reduxjs/toolkit'
import consumedNutrientsReducer from './consumed-nutrients'

const store = configureStore({
	reducer: {
		consumedNutrients: consumedNutrientsReducer,
	},
})

export default store

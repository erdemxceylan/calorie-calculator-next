import { configureStore } from '@reduxjs/toolkit';
import consumedNutrientsReducer from './consumed-nutrients';
import modalReducer from './modal';
import pageReducer from './page';

const store = configureStore({
   reducer: {
      consumedNutrients: consumedNutrientsReducer,
      modal: modalReducer,
      page: pageReducer
   },
});

export default store;

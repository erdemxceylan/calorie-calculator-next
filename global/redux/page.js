import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   displayHomePage: true,
   displayNutrientList: false
};

const pageSlice = createSlice({
   name: "page",
   initialState,
   reducers: {
      displayHomePage(state) {
         state.displayHomePage = true;
         state.displayNutrientList = false;
      },
      displayNutrientList(state) {
         state.displayHomePage = false;
         state.displayNutrientList = true;
      }
   }
});

export const pageActions = pageSlice.actions;

export default pageSlice.reducer;

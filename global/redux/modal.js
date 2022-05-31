import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   displayDataSettings: false,
   displayLogin: false,
   isLoggingIn: true
};

const ModalSlice = createSlice({
   name: 'modal',
   initialState,
   reducers: {
      displayDataSettings(state) {
         state.displayDataSettings = true;
      },
      hideDataSettings(state) {
         state.displayDataSettings = false;
      },
      displayLogin(state) {
         state.displayLogin = true;
      },
      hideLogin(state) {
         state.displayLogin = false;
      },
      switchSignup(state) {
         state.isLoggingIn = !state.isLoggingIn;
      }
   }
});

export const modalActions = ModalSlice.actions;

export default ModalSlice.reducer;

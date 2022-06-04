import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   isLoggingIn: true
};

const ModalSlice = createSlice({
   name: 'modal',
   initialState,
   reducers: {
      switchSignup(state) {
         state.isLoggingIn = !state.isLoggingIn;
      }
   }
});

export const modalActions = ModalSlice.actions;

export default ModalSlice.reducer;

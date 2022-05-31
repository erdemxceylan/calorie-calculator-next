import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../global/redux/modal';
import AuthContext from '../../global/context/auth';
import useHttpRequest from '../../hooks/use-http-request';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import LoginModalForm from './components/LoginModalForm';
import mainStyles from '../../App.module.css';
import styles from './LoginModal.module.css';

const WEB_API_KEY = 'AIzaSyCayV-EV6nQ6yPmmyoxp8FaYswze90k_QA';
const SIGN_UP_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const SIGN_IN_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
const SIGN_UP_URL = SIGN_UP_BASE_URL + WEB_API_KEY;
const SIGN_IN_URL = SIGN_IN_BASE_URL + WEB_API_KEY;
const POST = 'POST';

function LoginModal() {
   const displayLogin = useSelector(state => state.modal.displayLogin);
   const isLoggingIn = useSelector(state => state.modal.isLoggingIn);
   const dispatch = useDispatch();
   const auth = useContext(AuthContext);
   const { sendRequest: sign } = useHttpRequest();
   let formData = {};

   function closeHandler() {
      dispatch(modalActions.hideLogin());
   }

   function switchHandler() {
      dispatch(modalActions.switchSignup());
   }

   function getInputData(data) {
      formData = {
         email: data.enteredValues.email,
         password: data.enteredValues.password,
         isValid: data.isFormValid,
         reset: data.resetForm
      };
   }

   function submitHandler(event) {
      event.preventDefault();

      if (!formData.isValid) return;

      const url = isLoggingIn ? SIGN_IN_URL : SIGN_UP_URL;
      const method = POST;
      const body = {
         email: formData.email,
         password: formData.password,
         returnSecureToken: true
      };

      sign({ url, method, body }, data => auth.login(data.idToken, data.email));

      formData.reset();
   }

   const submitButton = (
      <Button
         className='p-button-success'
         label={isLoggingIn ? 'Login' : 'Sign up'}
         onClick={submitHandler}
      />
   );

   const switchButton = (
      <Button
         className={styles.switch}
         label={isLoggingIn ? 'Create a new account' : 'Login with an existing account'}
         onClick={switchHandler}
      />
   );

   return (
      <Dialog
         className={mainStyles.modal}
         header={isLoggingIn ? 'Login' : 'Sign up'}
         visible={displayLogin}
         onHide={closeHandler}
         footer={switchButton}
      >
         <div className={styles.form}>
            <LoginModalForm sendInputData={getInputData} />
            {submitButton}
         </div>
      </Dialog>
   );
}

export default LoginModal;

import { useContext } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import LoginModalForm from './components/LoginModalForm';
import AuthContext from '../../../global/context/auth';
import useHttpRequest from '../../../hooks/use-http-request';
import styles from './LoginModal.module.css';

const WEB_API_KEY = 'AIzaSyCayV-EV6nQ6yPmmyoxp8FaYswze90k_QA';
const SIGN_UP_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const SIGN_IN_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
const SIGN_UP_URL = SIGN_UP_BASE_URL + WEB_API_KEY;
const SIGN_IN_URL = SIGN_IN_BASE_URL + WEB_API_KEY;
const POST = 'POST';

export default function LoginModal(props) {
   const auth = useContext(AuthContext);
   const { sendRequest: sign } = useHttpRequest();
   let formData = {};

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

      const url = auth.isLoggingIn ? SIGN_IN_URL : SIGN_UP_URL;
      const method = POST;
      const body = {
         email: formData.email,
         password: formData.password,
         returnSecureToken: true
      };

      sign({ url, method, body }, data => auth.login(data.idToken, data.email));

      formData.reset();
      props.onHide();
   }

   const submitButton = (
      <Button
         className='p-button-success'
         label={auth.isLoggingIn ? 'Login' : 'Sign up'}
         onClick={submitHandler}
      />
   );

   const switchButton = (
      <Button
         className={styles.switch}
         label={auth.isLoggingIn ? 'Create a new account' : 'Login with an existing account'}
         onClick={auth.switchToSignup}
      />
   );

   return (
      <Dialog
         className='modal'
         header={auth.isLoggingIn ? 'Login' : 'Sign up'}
         visible={props.visible}
         onHide={props.onHide}
         footer={switchButton}
      >
         <div className={styles.form}>
            <LoginModalForm sendInputData={getInputData} />
            {submitButton}
         </div>
      </Dialog>
   );
}
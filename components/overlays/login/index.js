import { Fragment, useContext } from 'react';
import AuthContext from '../../../global/context/auth';
import useHttpRequest from '../../../hooks/use-http-request';
import { CONSTANTS } from '../../../global/constants';
import { Button } from 'primereact/button';
import Form from '../../../ui/form';
import Modal from '../../../ui/overlays/modal';
import * as Yup from 'yup';
import styles from './styles.module.css';

const { AUTH_URL, POST, ADMIN } = CONSTANTS;

export default function Login(props) {
   const auth = useContext(AuthContext);
   const { sendRequest: sign } = useHttpRequest();

   const inputs = [
      { name: 'email', placeholder: 'Email', type: 'email', initialValue: '' },
      { name: 'password', placeholder: 'Password', type: 'password', initialValue: '' }
   ];

   const validationSchema = Yup.object({
      email: auth.isLoggingIn ?
         Yup.string()
            .email('Please enter a valid email')
            .required('Please enter your email') :
         Yup.string()
            .email('Please enter a valid email')
            .required('Please enter your email')
            .notOneOf([ADMIN], `${ADMIN} is reserved`),
      password: Yup.string()
         .required('Please enter your password')
         .min(7, 'Password has to be 7 characters minimum')
   });

   async function submitHandler(values) {
      const url = AUTH_URL;
      const method = POST;
      const body = { isLoggingIn: auth.isLoggingIn, ...values };

      await sign({ url, method, body }, data => auth.login(data.idToken, data.email));

      props.onHide();
   }

   const content = (
      <Fragment>
         <Form
            inputs={inputs}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
            submitButtonLabel={auth.isLoggingIn ? 'Login' : 'Sign up'}
         />
         <Button
            className={styles.switch}
            label={auth.isLoggingIn ? 'Create a new account' : 'Login with an existing account'}
            onClick={auth.switchToSignup}
         />
      </Fragment>
   );

   return (
      <Modal
         header={auth.isLoggingIn ? 'Login' : 'Sign up'}
         visible={props.visible}
         onHide={props.onHide}
         content={content}
         resizable={false}
         draggable={false}
      />
   );
}
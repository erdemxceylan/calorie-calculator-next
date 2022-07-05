import { useContext } from 'react';
import AuthContext from '../../global/context/auth';
import * as Yup from 'yup';
import FormModal from '../../ui/form-modal/FormModal';
import { CONSTANTS } from '../../global/constants';
import useHttpRequest from '../../hooks/use-http-request';

export default function Login(props) {
   const auth = useContext(AuthContext);
   const { sendRequest: sign } = useHttpRequest();

   const inputs = [
      { name: 'email', placeholder: 'Email', type: 'email', initialValue: '' },
      { name: 'password', placeholder: 'Password', type: 'password', initialValue: '' }
   ];

   const validationSchema = Yup.object({
      email: Yup.email().required('Please enter your email'),
      password: Yup.password().required('Please enter your password')
   });

   function submitHandler(values) {
      console.log(values);
      // const url = CONSTANTS.AUTH_URL;
      // const method = CONSTANTS.POST;
      // const body = { isLoggingIn: auth.isLoggingIn, ...values };

      // sign({ url, method, body }, data => auth.login(data.idToken, data.email));

      // props.onHide();
   }

   // const switchButton = (
   //    <Button
   //       className={styles.switch}
   //       label={auth.isLoggingIn ? 'Create a new account' : 'Login with an existing account'}
   //       onClick={auth.switchToSignup}
   //    />
   // );

   return (
      <FormModal
         header={auth.isLoggingIn ? 'Login' : 'Sign up'}
         visible={props.visible}
         onHide={props.onHide}
         inputs={inputs}
         validationSchema={validationSchema}
         onSubmit={submitHandler}
         submitButtonLabel={auth.isLoggingIn ? 'Login' : 'Sign up'}
         resizable={false}
         draggable={false}
      />
   );
}
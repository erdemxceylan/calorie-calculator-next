import { Fragment, useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import AuthContext from '../../../../global/context/auth';
import useValidateInput from '../../../../hooks/use-validate-input';

const ADMIN = 'admin@test.com';

export default function LoginModalForm(props) {
   const auth = useContext(AuthContext);

   const {
      value: enteredEmail,
      isValid: enteredEmailIsValid,
      hasError: enteredEmailHasError,
      valueChangeHandler: enteredEmailChangeHandler,
      inputBlurHandler: enteredEmailBlurHandler,
      reset: resetEnteredEmail
   } = useValidateInput(value => value.includes('@'));

   const {
      value: enteredPassword,
      isValid: enteredPasswordIsValid,
      hasError: enteredPasswordHasError,
      valueChangeHandler: enteredPasswordChangeHandler,
      inputBlurHandler: enteredPasswordBlurHandler,
      reset: resetEnteredPassword
   } = useValidateInput(value => value.length > 6);

   let areInputsValid = enteredEmailIsValid && enteredPasswordIsValid;

   function resetInputs() {
      resetEnteredEmail();
      resetEnteredPassword();
   };

   props.sendInputData({
      enteredValues: {
         email: enteredEmail,
         password: enteredPassword,
      },
      isFormValid: areInputsValid,
      resetForm: resetInputs
   });

   const isAdmin = enteredEmail === ADMIN;

   if (!auth.isLoggingIn && isAdmin) {
      alert(`${ADMIN} is reserved`);
      resetInputs();
      areInputsValid = false;
   }

   return (
      <Fragment>
         <InputText
            className={enteredEmailHasError ? 'invalid' : null}
            placeholder='Email'
            value={enteredEmail}
            onChange={e => enteredEmailChangeHandler(e)}
            onBlur={enteredEmailBlurHandler}
         />
         <InputText
            className={enteredPasswordHasError ? 'invalid' : null}
            placeholder='Password'
            value={enteredPassword}
            onChange={e => enteredPasswordChangeHandler(e)}
            onBlur={enteredPasswordBlurHandler}
         />
      </Fragment>
   );
}
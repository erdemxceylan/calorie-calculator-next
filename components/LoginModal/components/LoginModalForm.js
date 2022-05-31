import React from 'react';
import { useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import useValidateInput from '../../../hooks/use-validate-input';
import mainStyles from '../../../App.module.css';

const ADMIN = 'admin@test.com';

function LoginModalForm(props) {
   const isLoggingIn = useSelector(state => state.modal.isLoggingIn);

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

   if (!isLoggingIn && isAdmin) {
      alert(`${ADMIN} is reserved`);
      resetInputs();
      areInputsValid = false;
   }

   return (
      <React.Fragment>
         <InputText
            className={enteredEmailHasError ? mainStyles.invalid : null}
            placeholder='Email'
            value={enteredEmail}
            onChange={e => enteredEmailChangeHandler(e)}
            onBlur={enteredEmailBlurHandler}
         />
         <InputText
            className={enteredPasswordHasError ? mainStyles.invalid : null}
            placeholder='Password'
            value={enteredPassword}
            onChange={e => enteredPasswordChangeHandler(e)}
            onBlur={enteredPasswordBlurHandler}
         />
      </React.Fragment>
   );
}

export default LoginModalForm;

import { useState } from 'react';

function useValidateInput(validateValue) {
   const [value, setValue] = useState('');
   const [isTouched, setIsTouched] = useState(false);

   const isValid = validateValue(value);
   const hasError = isTouched && !isValid;

   function valueChangeHandler(event) {
      setValue(event.target.value);
   }

   function inputBlurHandler() {
      setIsTouched(true);
   }

   function reset() {
      setValue('');
      setIsTouched(false);
   }

   return { value, isValid, hasError, valueChangeHandler, inputBlurHandler, reset };
}

export default useValidateInput;

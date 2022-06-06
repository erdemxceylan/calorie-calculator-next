import { InputText } from 'primereact/inputtext';
import useValidateInput from '../../hooks/use-validate-input';
import styles from './Form.module.css';

const TEXT = 'text';

export default function useInput(input) {
   const type = input.type ? input.type : TEXT;
   const validateNumber = (value, min, max) => !isNaN(value) && value >= min && value <= max;


   const {
      value,
      isValid,
      hasError,
      valueChangeHandler,
      inputBlurHandler,
      reset
   } = useValidateInput(input.validationMethod);

   const element = (
      <InputText
         className={hasError ? styles.invalid : null}
         type={type}
         placeholder={input.placeholder}
         min={input.min}
         max={input.max}
         value={value}
         onChange={e => valueChangeHandler(e)}
         onBlur={inputBlurHandler}
      />
   );

   return { element, isValid, reset };
}

// const type = input.type;
// const element = type === NUMBER ? (
//    <InputText
//       className={hasError ? styles.invalid : null}
//       type={type}
//       placeholder={input.placeholder}
//       min={input.min}
//       max={input.max}
//       value={value}
//       onChange={e => valueChangeHandler(e)}
//       onBlur={inputBlurHandler}
//    />
// ) : (
//    <InputText
//       className={hasError ? styles.invalid : null}
//       type={type}
//       placeholder={input.placeholder}
//       value={value}
//       onChange={e => valueChangeHandler(e)}
//       onBlur={inputBlurHandler}
//    />
// );

// Example
// input = { placeholder, type, min, max, validationMethod }
// const validationMethod = value => validateNumber(value, MIN, MAX)

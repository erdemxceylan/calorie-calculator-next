import styles from './Form.module.css';

const NUMBER = 'number';

// useInput, input = { placeholder, type, min, max, validationMethod }
// const validationMethod = value => validateNumber(value, MIN, MAX)

export default function useInput(input) {
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
import { Fragment } from 'react';
import { InputText } from 'primereact/inputtext';
import useValidateInput from '../../../../hooks/use-validate-input';

const MIN = 0;
const MAX = 1000;
const NUMBER = 'number';

export default function AddNutrientModalInputs(props) {

   const validateNumber = (value, min, max) => !isNaN(value) && value >= min && value <= max;
   const validateText = value => value.trim() !== '' ? true : false;

   const {
      value: enteredNutrientName,
      isValid: enteredNutrientNameIsValid,
      hasError: enteredNutrientNameHasError,
      valueChangeHandler: enteredNutrientNameChangeHandler,
      inputBlurHandler: enteredNutrientNameBlurHandler,
      reset: resetEnteredNutrientName
   } = useValidateInput(value => validateText(value));

   const {
      value: enteredUnit,
      isValid: enteredUnitIsValid,
      hasError: enteredUnitHasError,
      valueChangeHandler: enteredUnitChangeHandler,
      inputBlurHandler: enteredUnitBlurHandler,
      reset: resetEnteredUnit
   } = useValidateInput(value => validateText(value));

   const {
      value: enteredCalories,
      isValid: enteredCaloriesIsValid,
      hasError: enteredCaloriesHasError,
      valueChangeHandler: enteredCaloriesChangeHandler,
      inputBlurHandler: enteredCaloriesBlurHandler,
      reset: resetEnteredCalories
   } = useValidateInput(value => validateNumber(value, MIN, MAX));

   const {
      value: enteredProteins,
      isValid: enteredProteinsIsValid,
      hasError: enteredProteinsHasError,
      valueChangeHandler: enteredProteinsChangeHandler,
      inputBlurHandler: enteredProteinsBlurHandler,
      reset: resetEnteredProteins
   } = useValidateInput(value => validateNumber(value, MIN, MAX));

   const areInputsValid = (
      enteredNutrientNameIsValid &&
      enteredUnitIsValid &&
      enteredCaloriesIsValid &&
      enteredProteinsIsValid
   );

   function resetInputs() {
      resetEnteredNutrientName();
      resetEnteredUnit();
      resetEnteredCalories();
      resetEnteredProteins();
   };

   props.sendInputData({
      enteredValues: {
         nutrientName: enteredNutrientName,
         unit: enteredUnit,
         calories: enteredCalories,
         proteins: enteredProteins
      },
      isFormValid: areInputsValid,
      resetForm: resetInputs
   });

   return (
      <Fragment>
         <InputText
            className={enteredNutrientNameHasError ? 'invalid' : null}
            placeholder='Nutrient Name'
            value={enteredNutrientName}
            onChange={e => enteredNutrientNameChangeHandler(e)}
            onBlur={enteredNutrientNameBlurHandler}
         />
         <InputText
            className={enteredUnitHasError ? 'invalid' : null}
            placeholder='Unit'
            value={enteredUnit}
            onChange={e => enteredUnitChangeHandler(e)}
            onBlur={enteredUnitBlurHandler}
         />
         <InputText
            className={enteredCaloriesHasError ? 'invalid' : null}
            type={NUMBER}
            min={MIN}
            max={MAX}
            placeholder='Calories (kcal)'
            value={enteredCalories}
            onChange={e => enteredCaloriesChangeHandler(e)}
            onBlur={enteredCaloriesBlurHandler}
         />
         <InputText
            className={enteredProteinsHasError ? 'invalid' : null}
            type={NUMBER}
            min={MIN}
            max={MAX}
            placeholder='Proteins (gram)'
            value={enteredProteins}
            onChange={e => enteredProteinsChangeHandler(e)}
            onBlur={enteredProteinsBlurHandler}
         />
      </Fragment>
   );
}
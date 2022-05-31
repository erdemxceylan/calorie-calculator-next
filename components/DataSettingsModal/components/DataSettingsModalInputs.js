import React from 'react';
import { InputText } from 'primereact/inputtext';
import useValidateInput from '../../../hooks/use-validate-input';
import mainStyles from '../../../App.module.css';

const MIN = 1;
const MAX_ENTERED_DAILY_CALORIE_NEED = 100000;
const MAX_ENTERED_WEIGHT = 1000;
const MAX_ENTERED_FAT_RATIO = 100;
const NUMBER = 'number';

function DataSettingsModalInputs(props) {

   const validateValue = (value, min, max) => !isNaN(value) && value >= min && value <= max;

   const {
      value: enteredDailyCalorieNeed,
      isValid: enteredDailyCalorieNeedIsValid,
      hasError: enteredDailyCalorieNeedHasError,
      valueChangeHandler: enteredDailyCalorieNeedChangeHandler,
      inputBlurHandler: enteredDailyCalorieNeedBlurHandler,
      reset: resetEnteredDailyCalorieNeed
   } = useValidateInput(value => validateValue(value, MIN, MAX_ENTERED_DAILY_CALORIE_NEED));

   const {
      value: enteredWeight,
      isValid: enteredWeightIsValid,
      hasError: enteredWeightHasError,
      valueChangeHandler: enteredWeightChangeHandler,
      inputBlurHandler: enteredWeightBlurHandler,
      reset: resetEnteredWeight
   } = useValidateInput(value => validateValue(value, MIN, MAX_ENTERED_WEIGHT));

   const {
      value: enteredFatRatio,
      isValid: enteredFatRatioIsValid,
      hasError: enteredFatRatioHasError,
      valueChangeHandler: enteredFatRatioChangeHandler,
      inputBlurHandler: enteredFatRatioBlurHandler,
      reset: resetEnteredFatRatio
   } = useValidateInput(value => validateValue(value, MIN, MAX_ENTERED_FAT_RATIO));

   const areInputsValid = (
      enteredDailyCalorieNeedIsValid &&
      enteredWeightIsValid &&
      enteredFatRatioIsValid
   );

   function resetInputs() {
      resetEnteredDailyCalorieNeed();
      resetEnteredWeight();
      resetEnteredFatRatio();
   };

   props.sendInputData({
      enteredValues: {
         dailyCalorieNeed: enteredDailyCalorieNeed,
         weight: enteredWeight,
         fatRatio: enteredFatRatio
      },
      isFormValid: areInputsValid,
      resetForm: resetInputs
   });

   return (
      <React.Fragment>
         <InputText
            className={enteredDailyCalorieNeedHasError ? mainStyles.invalid : null}
            type={NUMBER}
            min={MIN}
            max={MAX_ENTERED_DAILY_CALORIE_NEED}
            placeholder="Daily Calorie Need (kcal)"
            value={enteredDailyCalorieNeed}
            onChange={e => enteredDailyCalorieNeedChangeHandler(e)}
            onBlur={enteredDailyCalorieNeedBlurHandler}
         />
         <InputText
            className={enteredWeightHasError ? mainStyles.invalid : null}
            type={NUMBER}
            min={MIN}
            max={MAX_ENTERED_WEIGHT}
            placeholder="Weight (kg)"
            value={enteredWeight}
            onChange={e => enteredWeightChangeHandler(e)}
            onBlur={enteredWeightBlurHandler}
         />
         <InputText
            className={enteredFatRatioHasError ? mainStyles.invalid : null}
            type={NUMBER}
            min={MIN}
            max={MAX_ENTERED_FAT_RATIO}
            placeholder="Fat Ratio (%)"
            value={enteredFatRatio}
            onChange={e => enteredFatRatioChangeHandler(e)}
            onBlur={enteredFatRatioBlurHandler}
         />
      </React.Fragment>
   );
}

export default DataSettingsModalInputs;

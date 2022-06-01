// import { useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import DataSettingsModalForm from './components/DataSettingsModalForm';
// import useHttpRequest from '../../hooks/use-http-request';
// import { modalActions } from '../../global/redux/modal';
// import DatabaseContext from '../../global/context/database';
import { InputText } from 'primereact/inputtext';
import useValidateInput from '../../../hooks/use-validate-input';
import mainStyles from '../../../App.module.css';
import styles from './DataSettingsModalForm.module.css';
import cn from 'classnames';
import FitnessGoalSelection from './FitnessGoalSelection';


export default function DataSettings() {
   // const displayDataSettings = useSelector(state => state.modal.displayDataSettings);
   // const dispatch = useDispatch();
   // const database = useContext(DatabaseContext);
   // const { error, sendRequest } = useHttpRequest();
   let formData = {};

   function closeHandler() {
      dispatch(modalActions.hideDataSettings());
   }

   function getInputData(inputData) {
      formData.reset = inputData.resetForm;
      formData.isValid = inputData.isFormValid;
      if (formData.isValid) {
         formData.dailyCalorieNeed = Number(inputData.enteredValues.dailyCalorieNeed);
         formData.weight = Number(inputData.enteredValues.weight);
         formData.fatRatio = Number(inputData.enteredValues.fatRatio);
      }
   }

   function getFitnessGoal(goal) {
      formData.fitnessGoal = goal;
   }

   function submitHandler() {

      if (!formData.isValid) return;

      sendRequest({
         url: 'http://localhost:8080/update-settings',
         method: 'PUT',
         body: {
            dailyCalorieNeed: formData.dailyCalorieNeed,
            weight: formData.weight,
            fatRatio: formData.fatRatio,
            fitnessGoal: formData.fitnessGoal
         }
      }, database.updateDailyTargetValues);

      if (error) console.log(error);

      formData.reset();
      closeHandler();
   }

   const submitButton = (
      <Button
         label='Submit'
         className='p-button-success'
         onClick={submitHandler}
      />
   );

   return (
      <Dialog
         className='modal'
         header='Data Settings'
         visible={displayDataSettings}
         onHide={closeHandler}
         footer={submitButton}
      >
         <DataSettingsModalForm sendInputData={getInputData} sendFitnessGoal={getFitnessGoal} />
      </Dialog>
   );
}



function DataSettingsModalForm(props) {

   function getInputData(inputData) {
      props.sendInputData(inputData);
   };

   function getFitnessGoal(goal) {
      props.sendFitnessGoal(goal);
   }

   return (
      <div className={cn("p-fluid", styles.form)}>
         <DataSettingsModalInputs sendInputData={getInputData} />
         <FitnessGoalSelection sendFitnessGoal={getFitnessGoal} />
      </div>
   );
}

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
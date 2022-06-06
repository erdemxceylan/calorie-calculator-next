import { Dialog } from 'primereact/dialog';
// import { Button } from 'primereact/button';
// import useHttpRequest from '../../../hooks/use-http-request';
import styles from './Form.module.css';
import cn from 'classnames';

export default function Form(props) {
   let form = {};

   // function getInputData(data) {
   //    form.data = data.enteredData
   //    form.isValid = data.isFormValid;
   //    form.reset = data.resetForm;
   // }

   // function submitHandler() {
   //    if (!form.isValid) return;

   //    form.reset();
   //    props.onHide();
   //    router.push(CONSTANTS.NUTRIENTS_PAGE);
   // }

   // const submitButton = (
   //    <Button
   //       label={props.submitButtonLabel}
   //       onClick={submitHandler} // props.onSubmit
   //    />
   // );

   return (
      <Dialog
         className={styles.modal}
         header={props.header}
         visible={props.visible}
         onHide={props.onHide}
         footer={submitButton}  // props.footer
      >
         <div className={cn('p-fluid', styles.form)}>
            {props.inputs}
         </div>
      </Dialog>
   );
}

export function Input(props) {
   const inputs = {
      input: { placeholder, type, min, max, validationMethod }
   };

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




// ADD NUTRIENT MODAL;

// import { useRouter } from 'next/router';
// import useHttpRequest from '../../../hooks/use-http-request';
// import { Dialog } from 'primereact/dialog';
// import { Button } from 'primereact/button';
// import AddNutrientModalInputs from './components/AddNutrientModalInputs';
// import { CONSTANTS } from '../../../global/constants';
// import styles from './AddNutrientModal.module.css';
// import cn from 'classnames';

// export default function AddNutrientModal(props) {
//    const router = useRouter();
//    const { sendRequest: addNutrient } = useHttpRequest();
//    let formData = {};

//    function getInputData(inputData) {
//       formData.name = inputData.enteredValues.nutrientName;
//       formData.unit = inputData.enteredValues.unit;
//       formData.calories = Number(inputData.enteredValues.calories);
//       formData.proteins = Number(inputData.enteredValues.proteins);
//       formData.isValid = inputData.isFormValid;
//       formData.reset = inputData.resetForm;
//    }

//    function submitHandler() {

//       if (!formData.isValid) return;

//       const url = CONSTANTS.ADD_NUTRIENT_URL;
//       const method = CONSTANTS.POST;
//       const body = {
//          name: formData.name,
//          unit: formData.unit,
//          calories: formData.calories,
//          proteins: formData.proteins
//       };

//       addNutrient({ url, method, body });

//       formData.reset();
//       props.onHide();
//       router.push(CONSTANTS.NUTRIENTS_PAGE);
//    }

//    const submitButton = (
//       <Button
//          label='Submit'
//          className='p-button-success'
//          onClick={submitHandler}
//       />
//    );

//    return (
//       <Dialog
//          className='modal'
//          header='Add New Nutrient'
//          visible={props.visible}
//          onHide={props.onHide}
//          footer={submitButton}
//       >
//          <div className={cn('p-fluid', styles.form)}>
//             <AddNutrientModalInputs sendInputData={getInputData} />
//          </div>
//       </Dialog>
//    );
// }



// import { Fragment } from 'react';
// import { InputText } from 'primereact/inputtext';
// import useValidateInput from '../../../../hooks/use-validate-input';

// const MIN = 0;
// const MAX = 1000;
// const NUMBER = 'number';

// export default function AddNutrientModalInputs(props) {

//    const validateNumber = (value, min, max) => !isNaN(value) && value >= min && value <= max;
//    const validateText = value => value.trim() !== '' ? true : false;

//    const {
//       value: enteredNutrientName,
//       isValid: enteredNutrientNameIsValid,
//       hasError: enteredNutrientNameHasError,
//       valueChangeHandler: enteredNutrientNameChangeHandler,
//       inputBlurHandler: enteredNutrientNameBlurHandler,
//       reset: resetEnteredNutrientName
//    } = useValidateInput(value => validateText(value));

//    const {
//       value: enteredUnit,
//       isValid: enteredUnitIsValid,
//       hasError: enteredUnitHasError,
//       valueChangeHandler: enteredUnitChangeHandler,
//       inputBlurHandler: enteredUnitBlurHandler,
//       reset: resetEnteredUnit
//    } = useValidateInput(value => validateText(value));

//    const {
//       value: enteredCalories,
//       isValid: enteredCaloriesIsValid,
//       hasError: enteredCaloriesHasError,
//       valueChangeHandler: enteredCaloriesChangeHandler,
//       inputBlurHandler: enteredCaloriesBlurHandler,
//       reset: resetEnteredCalories
//    } = useValidateInput(value => validateNumber(value, MIN, MAX));

//    const {
//       value: enteredProteins,
//       isValid: enteredProteinsIsValid,
//       hasError: enteredProteinsHasError,
//       valueChangeHandler: enteredProteinsChangeHandler,
//       inputBlurHandler: enteredProteinsBlurHandler,
//       reset: resetEnteredProteins
//    } = useValidateInput(value => validateNumber(value, MIN, MAX));

//    const areInputsValid = (
//       enteredNutrientNameIsValid &&
//       enteredUnitIsValid &&
//       enteredCaloriesIsValid &&
//       enteredProteinsIsValid
//    );

//    function resetInputs() {
//       resetEnteredNutrientName();
//       resetEnteredUnit();
//       resetEnteredCalories();
//       resetEnteredProteins();
//    };

//    props.sendInputData({
//       enteredValues: {
//          nutrientName: enteredNutrientName,
//          unit: enteredUnit,
//          calories: enteredCalories,
//          proteins: enteredProteins
//       },
//       isFormValid: areInputsValid,
//       resetForm: resetInputs
//    });

//    return (
//       <Fragment>
//          <InputText
//             className={enteredNutrientNameHasError ? 'invalid' : null}
//             placeholder='Nutrient Name'
//             value={enteredNutrientName}
//             onChange={e => enteredNutrientNameChangeHandler(e)}
//             onBlur={enteredNutrientNameBlurHandler}
//          />
//          <InputText
//             className={enteredUnitHasError ? 'invalid' : null}
//             placeholder='Unit'
//             value={enteredUnit}
//             onChange={e => enteredUnitChangeHandler(e)}
//             onBlur={enteredUnitBlurHandler}
//          />
//          <InputText
//             className={enteredCaloriesHasError ? 'invalid' : null}
//             type={NUMBER}
//             min={MIN}
//             max={MAX}
//             placeholder='Calories (kcal)'
//             value={enteredCalories}
//             onChange={e => enteredCaloriesChangeHandler(e)}
//             onBlur={enteredCaloriesBlurHandler}
//          />
//          <InputText
//             className={enteredProteinsHasError ? 'invalid' : null}
//             type={NUMBER}
//             min={MIN}
//             max={MAX}
//             placeholder='Proteins (gram)'
//             value={enteredProteins}
//             onChange={e => enteredProteinsChangeHandler(e)}
//             onBlur={enteredProteinsBlurHandler}
//          />
//       </Fragment>
//    );
// }


// DATA SETTINGS MODAL;

// import { useRouter } from 'next/router';
// import { Dialog } from 'primereact/dialog';
// import { Button } from 'primereact/button';
// import DataSettingsModalForm from './components/DataSettingsModalForm';
// import useHttpRequest from '../../../hooks/use-http-request';
// import { CONSTANTS } from '../../../global/constants';

// export default function DataSettings(props) {
//    const router = useRouter();
//    const { error, sendRequest: updateSettings } = useHttpRequest();
//    let formData = {};

//    function getInputData(inputData) {
//       formData.reset = inputData.resetForm;
//       formData.isValid = inputData.isFormValid;
//       if (formData.isValid) {
//          formData.dailyCalorieNeed = Number(inputData.enteredValues.dailyCalorieNeed);
//          formData.weight = Number(inputData.enteredValues.weight);
//          formData.fatRatio = Number(inputData.enteredValues.fatRatio);
//       }
//    }

//    function getFitnessGoal(goal) {
//       formData.fitnessGoal = goal;
//    }

//    function submitHandler() {

//       if (!formData.isValid) return;

//       const url = CONSTANTS.UPDATE_SETTINGS_URL;
//       const method = CONSTANTS.PUT;
//       const body = {
//          dailyCalorieNeed: formData.dailyCalorieNeed,
//          weight: formData.weight,
//          fatRatio: formData.fatRatio,
//          fitnessGoal: formData.fitnessGoal
//       };

//       updateSettings({ url, method, body });

//       if (error) console.log(error);

//       formData.reset();
//       props.onHide();
//       router.push(CONSTANTS.HOME_PAGE);
//    }

//    const submitButton = (
//       <Button
//          label='Submit'
//          className='p-button-success'
//          onClick={submitHandler}
//       />
//    );

//    return (
//       <Dialog
//          className='modal'
//          header='Data Settings'
//          visible={props.visible}
//          onHide={props.onHide}
//          footer={submitButton}
//       >
//          <DataSettingsModalForm
//             sendInputData={getInputData}
//             sendFitnessGoal={getFitnessGoal}
//          />
//       </Dialog>
//    );
// }


// import DataSettingsModalInputs from './DataSettingsModalInputs';
// import FitnessGoalSelection from './FitnessGoalSelection';
// import styles from './DataSettingsModalForm.module.css';
// import cn from 'classnames';

// export default function DataSettingsModalForm(props) {

//    function getInputData(data) {
//       props.sendInputData(data);
//    };

//    function getFitnessGoal(goal) {
//       props.sendFitnessGoal(goal);
//    }

//    return (
//       <div className={cn('p-fluid', styles.form)}>
//          <DataSettingsModalInputs sendInputData={getInputData} />
//          <FitnessGoalSelection sendFitnessGoal={getFitnessGoal} />
//       </div>
//    );
// }



// import { Fragment } from 'react';
// import { InputText } from 'primereact/inputtext';
// import useValidateInput from '../../../../hooks/use-validate-input';

// const MIN = 1;
// const MAX_ENTERED_DAILY_CALORIE_NEED = 100000;
// const MAX_ENTERED_WEIGHT = 1000;
// const MAX_ENTERED_FAT_RATIO = 100;
// const NUMBER = 'number';

// export default function DataSettingsModalInputs(props) {

//    const validateValue = (value, min, max) => !isNaN(value) && value >= min && value <= max;

//    const {
//       value: enteredDailyCalorieNeed,
//       isValid: enteredDailyCalorieNeedIsValid,
//       hasError: enteredDailyCalorieNeedHasError,
//       valueChangeHandler: enteredDailyCalorieNeedChangeHandler,
//       inputBlurHandler: enteredDailyCalorieNeedBlurHandler,
//       reset: resetEnteredDailyCalorieNeed
//    } = useValidateInput(value => validateValue(value, MIN, MAX_ENTERED_DAILY_CALORIE_NEED));

//    const {
//       value: enteredWeight,
//       isValid: enteredWeightIsValid,
//       hasError: enteredWeightHasError,
//       valueChangeHandler: enteredWeightChangeHandler,
//       inputBlurHandler: enteredWeightBlurHandler,
//       reset: resetEnteredWeight
//    } = useValidateInput(value => validateValue(value, MIN, MAX_ENTERED_WEIGHT));

//    const {
//       value: enteredFatRatio,
//       isValid: enteredFatRatioIsValid,
//       hasError: enteredFatRatioHasError,
//       valueChangeHandler: enteredFatRatioChangeHandler,
//       inputBlurHandler: enteredFatRatioBlurHandler,
//       reset: resetEnteredFatRatio
//    } = useValidateInput(value => validateValue(value, MIN, MAX_ENTERED_FAT_RATIO));

//    const areInputsValid = (
//       enteredDailyCalorieNeedIsValid &&
//       enteredWeightIsValid &&
//       enteredFatRatioIsValid
//    );

//    function resetInputs() {
//       resetEnteredDailyCalorieNeed();
//       resetEnteredWeight();
//       resetEnteredFatRatio();
//    };

//    props.sendInputData({
//       enteredValues: {
//          dailyCalorieNeed: enteredDailyCalorieNeed,
//          weight: enteredWeight,
//          fatRatio: enteredFatRatio
//       },
//       isFormValid: areInputsValid,
//       resetForm: resetInputs
//    });

//    return (
//       <Fragment>
//          <InputText
//             className={enteredDailyCalorieNeedHasError ? 'invalid' : null}
//             type={NUMBER}
//             min={MIN}
//             max={MAX_ENTERED_DAILY_CALORIE_NEED}
//             placeholder='Daily Calorie Need (kcal)'
//             value={enteredDailyCalorieNeed}
//             onChange={e => enteredDailyCalorieNeedChangeHandler(e)}
//             onBlur={enteredDailyCalorieNeedBlurHandler}
//          />
//          <InputText
//             className={enteredWeightHasError ? 'invalid' : null}
//             type={NUMBER}
//             min={MIN}
//             max={MAX_ENTERED_WEIGHT}
//             placeholder='Weight (kg)'
//             value={enteredWeight}
//             onChange={e => enteredWeightChangeHandler(e)}
//             onBlur={enteredWeightBlurHandler}
//          />
//          <InputText
//             className={enteredFatRatioHasError ? 'invalid' : null}
//             type={NUMBER}
//             min={MIN}
//             max={MAX_ENTERED_FAT_RATIO}
//             placeholder='Fat Ratio (%)'
//             value={enteredFatRatio}
//             onChange={e => enteredFatRatioChangeHandler(e)}
//             onBlur={enteredFatRatioBlurHandler}
//          />
//       </Fragment>
//    );
// }


// import { useState } from 'react';
// import { RadioButton } from 'primereact/radiobutton';
// import { CONSTANTS } from '../../../../global/constants';
// import styles from './FitnessGoalSelection.module.css';

// const WEIGHT_GAIN = CONSTANTS.WEIGHT_GAIN;
// const WEIGHT_LOSS = CONSTANTS.WEIGHT_LOSS;

// export default function FitnessGoalSelection(props) {
//    const [enteredFitnessGoal, setEnteredFitnessGoal] = useState(WEIGHT_GAIN);

//    props.sendFitnessGoal(enteredFitnessGoal);

//    return (
//       <div className={styles.radio}>
//          <h4>Fitness Goal</h4>
//          <div className='p-field-radiobutton'>
//             <RadioButton
//                inputId={WEIGHT_GAIN}
//                value={WEIGHT_GAIN}
//                onChange={(e) => setEnteredFitnessGoal(e.value)}
//                checked={enteredFitnessGoal === WEIGHT_GAIN}
//             />
//             <label htmlFor={WEIGHT_GAIN}>{WEIGHT_GAIN}</label>
//          </div>
//          <div className='p-field-radiobutton'>
//             <RadioButton
//                inputId={WEIGHT_LOSS}
//                value={WEIGHT_LOSS}
//                onChange={(e) => setEnteredFitnessGoal(e.value)}
//                checked={enteredFitnessGoal === WEIGHT_LOSS}
//             />
//             <label htmlFor={WEIGHT_LOSS}>{WEIGHT_LOSS}</label>
//          </div>
//       </div>
//    );
// }


// LOGIN MODAL


// import { useContext } from 'react';
// import { Dialog } from 'primereact/dialog';
// import { Button } from 'primereact/button';
// import { CONSTANTS } from '../../../global/constants';
// import LoginModalForm from './components/LoginModalForm';
// import AuthContext from '../../../global/context/auth';
// import useHttpRequest from '../../../hooks/use-http-request';
// import styles from './LoginModal.module.css';

// export default function LoginModal(props) {
//    const auth = useContext(AuthContext);
//    const { sendRequest: sign } = useHttpRequest();
//    let formData = {};

//    function getInputData(data) {
//       formData = {
//          email: data.enteredValues.email,
//          password: data.enteredValues.password,
//          isValid: data.isFormValid,
//          reset: data.resetForm
//       };
//    }

//    function submitHandler(event) {
//       event.preventDefault();

//       if (!formData.isValid) return;

//       const url = CONSTANTS.AUTH_URL;
//       const method = CONSTANTS.POST;
//       const body = {
//          isLoggingIn: auth.isLoggingIn,
//          email: formData.email,
//          password: formData.password
//       };

//       sign({ url, method, body }, data => auth.login(data.idToken, data.email));

//       formData.reset();
//       props.onHide();
//    }

//    const submitButton = (
//       <Button
//          className='p-button-success'
//          label={auth.isLoggingIn ? 'Login' : 'Sign up'}
//          onClick={submitHandler}
//       />
//    );

//    const switchButton = (
//       <Button
//          className={styles.switch}
//          label={auth.isLoggingIn ? 'Create a new account' : 'Login with an existing account'}
//          onClick={auth.switchToSignup}
//       />
//    );

//    return (
//       <Dialog
//          className='modal'
//          header={auth.isLoggingIn ? 'Login' : 'Sign up'}
//          visible={props.visible}
//          onHide={props.onHide}
//          footer={switchButton}
//       >
//          <div className={styles.form}>
//             <LoginModalForm sendInputData={getInputData} />
//             {submitButton}
//          </div>
//       </Dialog>
//    );
// }



// import { Fragment, useContext } from 'react';
// import { InputText } from 'primereact/inputtext';
// import { CONSTANTS } from '../../../../global/constants';
// import AuthContext from '../../../../global/context/auth';
// import useValidateInput from '../../../../hooks/use-validate-input';

// export default function LoginModalForm(props) {
//    const auth = useContext(AuthContext);

//    const {
//       value: enteredEmail,
//       isValid: enteredEmailIsValid,
//       hasError: enteredEmailHasError,
//       valueChangeHandler: enteredEmailChangeHandler,
//       inputBlurHandler: enteredEmailBlurHandler,
//       reset: resetEnteredEmail
//    } = useValidateInput(value => value.includes('@'));

//    const {
//       value: enteredPassword,
//       isValid: enteredPasswordIsValid,
//       hasError: enteredPasswordHasError,
//       valueChangeHandler: enteredPasswordChangeHandler,
//       inputBlurHandler: enteredPasswordBlurHandler,
//       reset: resetEnteredPassword
//    } = useValidateInput(value => value.length > 6);

//    let areInputsValid = enteredEmailIsValid && enteredPasswordIsValid;

//    function resetInputs() {
//       resetEnteredEmail();
//       resetEnteredPassword();
//    };

//    props.sendInputData({
//       enteredValues: {
//          email: enteredEmail,
//          password: enteredPassword,
//       },
//       isFormValid: areInputsValid,
//       resetForm: resetInputs
//    });

//    const isAdmin = enteredEmail === CONSTANTS.ADMIN;

//    if (!auth.isLoggingIn && isAdmin) {
//       alert(`${CONSTANTS.ADMIN} is reserved`);
//       resetInputs();
//       areInputsValid = false;
//    }

//    return (
//       <Fragment>
//          <InputText
//             className={enteredEmailHasError ? 'invalid' : null}
//             placeholder='Email'
//             value={enteredEmail}
//             onChange={e => enteredEmailChangeHandler(e)}
//             onBlur={enteredEmailBlurHandler}
//          />
//          <InputText
//             className={enteredPasswordHasError ? 'invalid' : null}
//             placeholder='Password'
//             value={enteredPassword}
//             onChange={e => enteredPasswordChangeHandler(e)}
//             onBlur={enteredPasswordBlurHandler}
//          />
//       </Fragment>
//    );
// }
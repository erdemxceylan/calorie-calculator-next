// import { useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import DataSettingsModalForm from './components/DataSettingsModalForm';
// import useHttpRequest from '../../hooks/use-http-request';
// import { modalActions } from '../../global/redux/modal';
// import DatabaseContext from '../../global/context/database';

function DataSettings() {
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

export default DataSettings;

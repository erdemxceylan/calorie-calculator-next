import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import DataSettingsModalForm from './components/DataSettingsModalForm';
import useHttpRequest from '../../../hooks/use-http-request';

export default function DataSettings(props) {
   const { error, sendRequest: updateSettings } = useHttpRequest();
   let formData = {};

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

      updateSettings({
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
      props.onHide();
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
         visible={props.visible}
         onHide={props.onHide}
         footer={submitButton}
      >
         <DataSettingsModalForm sendInputData={getInputData} sendFitnessGoal={getFitnessGoal} />
      </Dialog>
   );
}
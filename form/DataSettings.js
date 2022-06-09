// import { useRouter } from 'next/router';
import { Dialog } from 'primereact/dialog';
// import { Button } from 'primereact/button';
// import DataSettingsModalForm from './components/DataSettingsModalForm';
// import useHttpRequest from '../../../hooks/use-http-request';
// import { CONSTANTS } from '../../../global/constants';
import DataSettingsForm from './formik/DataSettingsForm';

export default function DataSettings(props) {
   // const router = useRouter();
   // const { error, sendRequest: updateSettings } = useHttpRequest();
   // let formData = {};

   // function getInputData(inputData) {
   //    formData.reset = inputData.resetForm;
   //    formData.isValid = inputData.isFormValid;
   //    if (formData.isValid) {
   //       formData.dailyCalorieNeed = Number(inputData.enteredValues.dailyCalorieNeed);
   //       formData.weight = Number(inputData.enteredValues.weight);
   //       formData.fatRatio = Number(inputData.enteredValues.fatRatio);
   //    }
   // }

   // function getFitnessGoal(goal) {
   //    formData.fitnessGoal = goal;
   // }

   // function submitHandler() {

   //    if (!formData.isValid) return;

   //    const url = CONSTANTS.UPDATE_SETTINGS_URL;
   //    const method = CONSTANTS.PUT;
   //    const body = {
   //       dailyCalorieNeed: formData.dailyCalorieNeed,
   //       weight: formData.weight,
   //       fatRatio: formData.fatRatio,
   //       fitnessGoal: formData.fitnessGoal
   //    };

   //    updateSettings({ url, method, body });

   //    if (error) console.log(error);

   //    formData.reset();
   //    props.onHide();
   //    router.push(CONSTANTS.HOME_PAGE);
   // }

   // const submitButton = (
   //    <Button
   //       label='Submit'
   //       className='p-button-success'
   //       onClick={submitHandler}
   //    />
   // );

   return (
      <Dialog
         className='modal'
         header='Data Settings'
         visible={props.visible}
         onHide={props.onHide}
         // footer={submitButton}
         resizable={false}
         draggable={false}
      >
         {/* <DataSettingsModalForm
            sendInputData={getInputData}
            sendFitnessGoal={getFitnessGoal}
         /> */}

         <DataSettingsForm />
      </Dialog>
   );
}
import { useRouter } from 'next/router';
import useHttpRequest from '../../../hooks/use-http-request';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import AddNutrientModalInputs from './components/AddNutrientModalInputs';
import { CONSTANTS } from '../../../global/constants';
import styles from './AddNutrientModal.module.css';
import cn from 'classnames';

export default function AddNutrientModal(props) {
   const router = useRouter();
   const { sendRequest: addNutrient } = useHttpRequest();
   let formData = {};

   function getInputData(inputData) {
      formData.name = inputData.enteredValues.nutrientName;
      formData.unit = inputData.enteredValues.unit;
      formData.calories = Number(inputData.enteredValues.calories);
      formData.proteins = Number(inputData.enteredValues.proteins);
      formData.isValid = inputData.isFormValid;
      formData.reset = inputData.resetForm;
   }

   function submitHandler() {

      if (!formData.isValid) return;

      const url = CONSTANTS.ADD_NUTRIENT_URL;
      const method = CONSTANTS.POST;
      const body = {
         name: formData.name,
         unit: formData.unit,
         calories: formData.calories,
         proteins: formData.proteins
      };

      addNutrient({ url, method, body });

      formData.reset();
      props.onHide();
      router.push(CONSTANTS.NUTRIENTS_PAGE);
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
         header='Add New Nutrient'
         visible={props.visible}
         onHide={props.onHide}
         footer={submitButton}
      >
         <div className={cn('p-fluid', styles.form)}>
            <AddNutrientModalInputs sendInputData={getInputData} />
         </div>
      </Dialog>
   );
}
import { useRouter } from 'next/router';
import useHttpRequest from '../../hooks/use-http-request';
import { CONSTANTS } from '../../global/constants';
import FormModal from '../../ui/form-modal/FormModal';
import * as Yup from 'yup';

export default function AddNewNutrient(props) {
   const router = useRouter();
   const { sendRequest: addNewNutrient } = useHttpRequest();

   const inputs = [
      { name: 'name', placeholder: 'Nutrient Name', type: 'text', initialValue: '' },
      { name: 'unit', placeholder: 'Unit', type: 'text', initialValue: '' },
      { name: 'calories', placeholder: 'Calories (kcal)', type: 'number', initialValue: '' },
      { name: 'proteins', placeholder: 'Proteins (gram)', type: 'number', initialValue: '' }
   ];

   const validationSchema = Yup.object({
      name: Yup.string()
         .required('Please enter the nutrient name'),
      unit: Yup.string()
         .required('Please enter the unit'),
      calories: Yup.number()
         .test('is non-negative?', 'Please enter a non-negative value', value => value >= 0)
         .required('Please enter calories for 1 unit'),
      proteins: Yup.number()
         .test('is non-negative?', 'Please enter a non-negative value', value => value >= 0)
         .required('Please enter proteins for 1 unit')
   });

   function submitHandler(values) {
      const url = CONSTANTS.ADD_NUTRIENT_URL;
      const method = CONSTANTS.POST;
      const body = values;

      addNewNutrient({ url, method, body });

      props.onHide();
      router.push(CONSTANTS.NUTRIENTS_PAGE);
   }

   return (
      <FormModal
         header='Add New Nutrient'
         visible={props.visible}
         onHide={props.onHide}
         inputs={inputs}
         validationSchema={validationSchema}
         onSubmit={submitHandler}
         submitButtonLabel={'Submit'}
         resizable={false}
         draggable={false}
      />
   );
}
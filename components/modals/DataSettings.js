import { useRouter } from 'next/router';
import * as Yup from 'yup';
import FormModal from '../../ui/form-modal/FormModal';
import { CONSTANTS } from '../../global/constants';
import useHttpRequest from '../../hooks/use-http-request';

export default function DataSettings(props) {
   const router = useRouter();
   const { sendRequest: updateSettings } = useHttpRequest();

   const selections = [{ value: CONSTANTS.WEIGHT_GAIN }, { value: CONSTANTS.WEIGHT_LOSS }];

   const inputs = [
      { name: 'dailyCalorieNeed', placeholder: `${CONSTANTS.DCN} (kcal)`, type: 'number', initialValue: '' },
      { name: 'weight', placeholder: `${CONSTANTS.WEIGHT} (kg)`, type: 'number', initialValue: '' },
      { name: 'fatRatio', placeholder: `${CONSTANTS.FAT_RATIO} (%)`, type: 'number', initialValue: '' },
      { name: 'fitnessGoal', placeholder: CONSTANTS.FITNESS_GOAL, type: 'radio', initialValue: '', selections }
   ];

   const validationSchema = Yup.object({
      dailyCalorieNeed: Yup.number()
         .positive('Daily calorie need must be positive')
         // .integer('Daily calorie need must be an integer')
         .max(100000, 'Daily calorie need can be 100000 maximum')
         .required('Please enter your daily calorie need'),
      weight: Yup.number()
         .positive('Weight must be positive')
         // .integer('Weight must be an integer')
         .max(10000, 'Weight can be 10000 maximum')
         .required('Please enter your weight'),
      fatRatio: Yup.number()
         .positive('Fat ratio must be positive')
         // .integer('Fat ratio must be an integer')
         .max(99, 'Fat ratio can be 99 maximum')
         .required('Please enter your fat ratio'),
      fitnessGoal: Yup.string()
         .required('Please select your fitness goal')
   });

   function submitHandler(values) {
      const url = CONSTANTS.UPDATE_SETTINGS_URL;
      const method = CONSTANTS.PUT;
      const body = values;

      updateSettings({ url, method, body });

      props.onHide();
      router.push(CONSTANTS.HOME_PAGE);
   }

   return (
      <FormModal
         header='Data Settings'
         visible={props.visible}
         onHide={props.onHide}
         inputs={inputs}
         validationSchema={validationSchema}
         onSubmit={submitHandler}
         submitButtonLabel='Submit'
         resizable={false}
         draggable={false}
      />
   );
}
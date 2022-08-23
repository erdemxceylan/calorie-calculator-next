import { useRouter } from 'next/router';
import { useState } from 'react';
import useHttpRequest from '../../../hooks/use-http-request';
import { CONSTANTS } from '../../../global/constants';
import FormModal from '../../../ui/overlays/form';
import * as Yup from 'yup';

export default function DataSettings(props) {
   const { initialValues } = props;

   const router = useRouter();
   const { isLoading, sendRequest: updateSettings } = useHttpRequest();
   const [buttonLabel, setButtonLabel] = useState('Submit');
   const delay = 300;

   const selections = [{ value: CONSTANTS.WEIGHT_GAIN }, { value: CONSTANTS.WEIGHT_LOSS }];

   const inputs = [
      { name: 'dailyCalorieNeed', placeholder: `${CONSTANTS.DCN} (kcal)`, type: 'number', initialValue: initialValues.dailyCalorieNeed },
      { name: 'weight', placeholder: `${CONSTANTS.WEIGHT} (kg)`, type: 'number', initialValue: initialValues.weight },
      { name: 'fatRatio', placeholder: `${CONSTANTS.FAT_RATIO} (%)`, type: 'number', initialValue: initialValues.fatRatio },
      { name: 'fitnessGoal', placeholder: CONSTANTS.FITNESS_GOAL, type: 'radio', initialValue: initialValues.fitnessGoal, selections }
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

      updateSettings({ url, method, body }, () => {
         setButtonLabel(<i className='pi pi-check' />);
         setTimeout(() => props.onHide(), delay);
         setTimeout(() => setButtonLabel('Submit'), delay + 300);
         router.push(CONSTANTS.HOME_PAGE);
      });
   }

   return (
      <FormModal
         header='Data Settings'
         visible={props.visible}
         onHide={props.onHide}
         inputs={inputs}
         validationSchema={validationSchema}
         onSubmit={submitHandler}
         submitButtonLabel={isLoading ? <i className='pi pi-spinner' /> : buttonLabel}
         disabled={isLoading}
         resizable={false}
         draggable={false}
      />
   );
}
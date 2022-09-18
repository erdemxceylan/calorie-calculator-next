import { useRouter } from 'next/router';
import useHttpRequest from '../../../hooks/use-http-request';
import { CONSTANTS } from '../../../global/constants';
import Form from '../../../ui/overlays/form';
import * as Yup from 'yup';
import { useState } from 'react';

const { DCN, WEIGHT, FAT_RATIO, FITNESS_GOAL, WEIGHT_GAIN, WEIGHT_LOSS, UPDATE_SETTINGS_URL, PUT, DELAY, HOME } = CONSTANTS;

export default function DataSettings(props) {
   const { initialValues } = props;
   const [isSubmitted, setIsSubmitted] = useState(false);
   const router = useRouter();
   const { isLoading, sendRequest: updateSettings } = useHttpRequest();

   const selections = [{ value: WEIGHT_GAIN }, { value: WEIGHT_LOSS }];

   const inputs = [
      { name: 'dailyCalorieNeed', placeholder: `${DCN} (kcal)`, type: 'number', initialValue: initialValues.dailyCalorieNeed },
      { name: 'weight', placeholder: `${WEIGHT} (kg)`, type: 'number', initialValue: initialValues.weight },
      { name: 'fatRatio', placeholder: `${FAT_RATIO} (%)`, type: 'number', initialValue: initialValues.fatRatio },
      { name: 'fitnessGoal', placeholder: FITNESS_GOAL, type: 'radio', initialValue: initialValues.fitnessGoal, selections }
   ];

   const validationSchema = Yup.object({
      dailyCalorieNeed: Yup.number()
         .positive('Daily calorie need must be positive')
         .integer('Daily calorie need must be an integer')
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

   async function submitHandler(values) {
      const url = UPDATE_SETTINGS_URL;
      const method = PUT;
      const body = values;

      await updateSettings({ url, method, body }, () => {
         setIsSubmitted(true);
         setTimeout(() => props.onHide(), DELAY);
         setTimeout(() => setIsSubmitted(false), DELAY * 2);
         router.push(HOME);
      });
   }

   return (
      <Form
         header='Data Settings'
         visible={props.visible}
         onHide={props.onHide}
         inputs={inputs}
         validationSchema={validationSchema}
         onSubmit={submitHandler}
         loading={isLoading}
         submitted={isSubmitted}
         submitButtonLabel={'Submit'}
         disabled={isLoading}
         resizable={false}
         draggable={false}
      />
   );
}
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikController from './FormikController.js';
import { CONSTANTS } from '../../global/constants';
import styles from './Formik.module.css';

const INPUT = 'input';
const NUMBER = 'number';

export default function DataSettingsForm() {
   const choices = [
      { key: CONSTANTS.WEIGHT_GAIN, value: CONSTANTS.WEIGHT_GAIN },
      { key: CONSTANTS.WEIGHT_LOSS, value: CONSTANTS.WEIGHT_LOSS },
   ];

   const initialValues = {
      dailyCalorieNeed: '',
      weight: '',
      fatRatio: '',
      fitnessGoal: CONSTANTS.WEIGHT_GAIN
   };

   const validationSchema = Yup.object({
      dailyCalorieNeed: Yup.number().min(1).max(10000).required('Please enter your daily calorie need'),
      weight: Yup.number().min(1).max(1000).required('Please enter your weight'),
      fatRatio: Yup.number().min(1).max(99).required('Please enter your fat ratio'),
      fitnessGoal: Yup.string().required('Please choose a fitness goal'),
   });

   const onSubmit = values => console.log('Form Data', values);

   return (
      <Formik
         /*className={styles.formik}*/
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={onSubmit}
      >
         {formik => (
            <Form>
               <FormikController
                  control={INPUT}
                  type={NUMBER}
                  placeholder='Daily Calorie Need (kcal)'
                  name={'dailyCalorieNeed'}
               />
               <FormikController
                  control={INPUT}
                  type={NUMBER}
                  placeholder='Weight (kg)'
                  name={'weight'}
               />
               <FormikController
                  control={INPUT}
                  type={NUMBER}
                  placeholder='Fat Ratio (%)'
                  name={'fatRatio'}
               />
               <FormikController
                  control='radio'
                  label='Fitness Goal'
                  name={'fitnessGoal'}
                  options={choices}
               />
               <button type='submit'>Submit</button>
            </Form>
         )}
      </Formik>
   );
}
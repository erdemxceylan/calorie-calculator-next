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
      dailyCalorieNeed: Yup.number()
         .positive('Daily calorie need must be positive')
         .integer('Daily calorie need must be integer')
         .max(10000, 'Daily calorie need can be 10000 maximum')
         .required('Please enter your daily calorie need'),
      weight: Yup.number()
         .positive('Weight must be positive')
         .integer('Weight must be integer')
         .max(1000, 'Weight can be 1000 maximum')
         .required('Please enter your weight'),
      fatRatio: Yup.number()
         .positive('Fat ratio must be positive')
         .integer('Fat ratio must be integer')
         .max(99, 'Fat ratio can be 99 maximum')
         .required('Please enter your fat ratio'),
      fitnessGoal: Yup.string().required('Please choose a fitness goal'),
   });

   const onSubmit = values => console.log('Form Data', values);

   return (
      <Formik
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={onSubmit}
      >
         {formik => (
            <Form className={styles.form} >
               <FormikController
                  control={INPUT}
                  type={NUMBER}
                  placeholder='Daily Calorie Need (kcal)'
                  name={'dailyCalorieNeed'}
                  errors={formik.errors}
                  touched={formik.touched}
               />
               <FormikController
                  control={INPUT}
                  type={NUMBER}
                  placeholder='Weight (kg)'
                  name={'weight'}
                  errors={formik.errors}
                  touched={formik.touched}
               />
               <FormikController
                  control={INPUT}
                  type={NUMBER}
                  placeholder='Fat Ratio (%)'
                  name={'fatRatio'}
                  errors={formik.errors}
                  touched={formik.touched}
               />
               <FormikController
                  control='radio'
                  label='Fitness Goal'
                  name={'fitnessGoal'}
                  options={choices}
                  errors={formik.errors}
                  touched={formik.touched}
               />
               <button type='submit'>Submit</button>
            </Form>
         )}
      </Formik>
   );
}
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from './Input.js';
import { Button } from 'primereact/button';
import styles from './Formik.module.css';
import FitnessGoalSelection from './FitnessGoalSelection.js';

const NUMBER = 'number';

export default function DataSettingsForm() {
   let formData = {};

   const initialValues = {
      dailyCalorieNeed: '',
      weight: '',
      fatRatio: '',
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
   });

   function getFitnessGoal(goal) {
      formData = { fitnessGoal: goal };
   }

   return (
      <Formik
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={(values, { resetForm }) => {
            formData = { ...formData, ...values };
            setTimeout(() => {
               console.log(formData);
               resetForm();
            }, 1500);
         }}
      >
         {formik => (
            <Form className={styles.form} >
               <Input
                  type={NUMBER}
                  placeholder='Daily Calorie Need (kcal)'
                  name={'dailyCalorieNeed'}
                  errors={formik.errors}
                  touched={formik.touched}
               />
               <Input
                  type={NUMBER}
                  placeholder='Weight (kg)'
                  name={'weight'}
                  errors={formik.errors}
                  touched={formik.touched}
               />
               <Input
                  type={NUMBER}
                  placeholder='Fat Ratio (%)'
                  name={'fatRatio'}
                  errors={formik.errors}
                  touched={formik.touched}
               />
               <FitnessGoalSelection sendFitnessGoal={getFitnessGoal} />
               <Button label='Submit' type='submit' disabled={formik.isSubmitting} />
            </Form>
         )}
      </Formik>
   );
}
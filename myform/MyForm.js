import { Formik, Form } from 'formik';
import { Button } from 'primereact/button';
import Input from '../form/formik/Input';
import MyRadioButton from '../form/formik/MyRadioButton';
import styles from './MyForm.module.css';

export default function MyForm({ inputs, validationSchema, onSubmit, submitButtonLabel }) {
   let initialValues = {};
   inputs.map(input => initialValues[`${input.name}`] = input.initialValue);

   return (
      <Formik
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
         }}
      >
         {formik => (
            <Form className={styles.form} >
               {inputs.map(input =>
                  <Input
                     key={input.name}
                     type={input.type}
                     placeholder={input.placeholder}
                     name={input.name}
                     errors={formik.errors}
                     touched={formik.touched}
                  />
               )}
               {/* <MyRadioButton name='fitnessGoal' /> */}
               <Button
                  label={submitButtonLabel}
                  type='submit'
                  disabled={formik.isSubmitting}
               />
            </Form>
         )}
      </Formik>
   );
}
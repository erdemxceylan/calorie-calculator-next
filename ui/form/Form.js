import { Formik, Form as FormikForm } from 'formik';
import { Button } from 'primereact/button';
import Inputs from './Inputs';
import styles from './Form.module.css';

export default function Form({ inputs, validationSchema, onSubmit, submitButtonLabel, disabled }) {
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
            <FormikForm className={styles.form} >
               {inputs.map(input =>
                  <Inputs
                     key={input.name}
                     name={input.name}
                     placeholder={input.placeholder}
                     type={input.type}
                     errors={formik.errors}
                     touched={formik.touched}
                     selections={input.selections}
                  />
               )}
               <Button
                  label={submitButtonLabel}
                  type='submit'
                  disabled={formik.isSubmitting || disabled}
               />
            </FormikForm>
         )}
      </Formik>
   );
}
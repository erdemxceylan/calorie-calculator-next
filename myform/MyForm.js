import { Formik, Form } from 'formik';
import { Button } from 'primereact/button';
import Inputs from './Inputs';
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
                  <Inputs
                     key={input.name}
                     type={input.type}
                     placeholder={input.placeholder}
                     name={input.name}
                     errors={formik.errors}
                     touched={formik.touched}
                     selections={input.selections}
                  />
               )}
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
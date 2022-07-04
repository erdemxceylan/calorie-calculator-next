import { Fragment } from 'react';
import { Field } from 'formik';
import { RadioButton } from 'primereact/radiobutton';
import styles from '../MyForm.module.css';

export default function Radio(props) {
   const { name, placeholder, selections } = props;

   return (
      <div className={styles.radio}>
         <Field name={name} >
            {({ field }) => {
               return (
                  <Fragment>
                     <h4>{placeholder}</h4>
                     {selections.map(selection => (
                        <div className='p-field-radiobutton' key={selection.value}>
                           <RadioButton
                              inputId={selection.value}
                              {...field}
                              value={selection.value}
                              checked={field.value === selection.value}
                           />
                           <label htmlFor={selection.value}>{selection.value}</label>
                        </div>
                     ))}
                  </Fragment>
               );
            }}
         </Field>
      </div>
   );
}
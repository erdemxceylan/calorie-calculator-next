import { Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';
import { RadioButton } from 'primereact/radiobutton';
import { CONSTANTS } from '../../global/constants';
import styles from './Formik.module.css';

export default function MyRadioButton(props) {
   const { name } = props;

   return (
      <Fragment>
         <div className={styles.radio}>
            <Field name={name} >
               {({ field }) => {
                  return (
                     <Fragment>
                        <h4>Fitness Goal</h4>
                        <div className='p-field-radiobutton'>
                           <RadioButton
                              inputId={CONSTANTS.WEIGHT_GAIN}
                              {...field}
                              value={CONSTANTS.WEIGHT_GAIN}
                              checked={field.value === CONSTANTS.WEIGHT_GAIN}
                           />
                           <label htmlFor={CONSTANTS.WEIGHT_GAIN}>{CONSTANTS.WEIGHT_GAIN}</label>
                        </div>
                        <div className='p-field-radiobutton'>
                           <RadioButton
                              inputId={CONSTANTS.WEIGHT_LOSS}
                              {...field}
                              value={CONSTANTS.WEIGHT_LOSS}
                              checked={field.value === CONSTANTS.WEIGHT_LOSS}
                           />
                           <label htmlFor={CONSTANTS.WEIGHT_LOSS}>{CONSTANTS.WEIGHT_LOSS}</label>
                        </div>
                     </Fragment>
                  );
               }}
            </Field>
         </div>
         <ErrorMessage className={styles['error-message']} name={name} component='div' />
      </Fragment>
   );
}

import { Field } from 'formik';
import { InputText } from 'primereact/inputtext';
import styles from './Password.module.css';

export default function Password(props) {
   const { className, name, type, ...rest } = props;

   return (
      <Field name={name} >
         {({ field }) => (
            <div className={styles.password}>
               <InputText className={className} type={type} {...field} {...rest} />
               <i className='pi pi-eye' />
            </div>
         )
         }
      </Field>
   );
}
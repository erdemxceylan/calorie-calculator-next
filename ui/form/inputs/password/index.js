import { useState } from 'react';
import { Field } from 'formik';
import { InputText } from 'primereact/inputtext';
import styles from './styles.module.css';

const PASSWORD = 'password';
const TEXT = 'text';

export default function Password(props) {
   const { className, name, ...rest } = props;
   const [type, setType] = useState(PASSWORD);

   return (
      <Field name={name} >
         {({ field }) => (
            <div className={styles.container}>
               <InputText className={className} {...field} {...rest} type={type} />
               <i
                  className={type === PASSWORD ? 'pi pi-eye-slash' : 'pi pi-eye blue'}
                  onClick={() => setType(state => state === PASSWORD ? TEXT : PASSWORD)}
               />
            </div>
         )}
      </Field>
   );
}
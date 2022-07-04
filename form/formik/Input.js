import { Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';
import { InputText } from 'primereact/inputtext';
import styles from './Formik.module.css';

export default function Input(props) {
  const { name, errors, touched, ...rest } = props;
  const invalid = errors[name] && touched[name] ? styles.invalid : null;

  return (
    <Fragment>
      <Field name={name} >
        {({ field }) => <InputText className={invalid} {...field} {...rest} />}
      </Field>
      <ErrorMessage className={styles['error-message']} name={name} component='div' />
    </Fragment>
  );
}
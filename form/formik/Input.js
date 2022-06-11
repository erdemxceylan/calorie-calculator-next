import { Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';
import styles from './Formik.module.css';

export default function Input(props) {
  const { name, label, errors, touched, ...rest } = props;
  const invalid = errors[name] && touched[name] ? 'invalid' : null;

  return (
    <Fragment>
      {/* <label htmlFor={name}> {label}</label> */}
      <div className={invalid}>
        <Field className={styles.input} name={name} {...rest} />
        <ErrorMessage component='div' name={name} />
      </div>
    </Fragment>
  );
}
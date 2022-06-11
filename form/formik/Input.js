import { Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';
import styles from './Formik.module.css';
import cn from 'classnames';

export default function Input(props) {
  const { name, label, errors, touched, ...rest } = props;
  const invalid = errors[name] && touched[name] ? styles.invalid : null;

  return (
    <Fragment>
      <Field className={cn(styles.input, invalid)} name={name} {...rest} />
      <ErrorMessage component='div' className={styles['error-message']} name={name} />
    </Fragment>
  );
}
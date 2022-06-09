import { Fragment } from 'react';
import { Field, ErrorMessage } from "formik";
import styles from './Formik.module.css';
import cn from 'classnames';

export default function Input(props) {
  const { name, label, errors, touched, ...rest } = props;
  const invalid = errors[name] && touched[name] ? 'invalid' : null;

  return (
    <Fragment>
      {/* <label htmlFor={name}> {label}</label> */}
      <Field className={cn(styles.input, invalid)} name={name} {...rest} />
      <ErrorMessage component='div' className='invalid' name={name} />
    </Fragment>
  );
}
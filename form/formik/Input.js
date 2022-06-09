import { Field, ErrorMessage } from "formik";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import styles from './Formik.module.css';
import { Fragment } from 'react';

function Input(props) {
  const { name, label, ...rest } = props;
  return (
    <Fragment>
      <label htmlFor={name}> {label}</label>
      <Field className={styles.finput} name={name} {...rest} />
      {/* <InputNumber name={name} {...rest} /> */}
      {/* <InputText name={name} {...rest} /> */}
      <ErrorMessage name={name} />
    </Fragment>
  );
}
export default Input;
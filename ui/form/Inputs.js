import { ErrorMessage } from 'formik';
import Radio from './inputs/Radio';
import Input from './inputs/Input';
import styles from './Inputs.module.css';

export default function Inputs(props) {
  const { type, name, errors, touched, ...rest } = props;
  const invalid = errors[name] && touched[name] ? styles.invalid : null;
  let input;

  switch (type) {
    case 'radio':
      input = <Radio name={name} type={type} {...rest} />;
      break;
    default:
      input = <Input className={invalid} name={name} type={type} {...rest} />;
      break;
  }

  return (
    <div>
      {input}
      <ErrorMessage className={styles['error-message']} name={name} component='p' />
    </div>
  );
}
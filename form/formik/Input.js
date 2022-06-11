import { Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';
import InputText from 'primereact/inputtext';
import MyInput from './MyInput';
import styles from './Formik.module.css';
import cn from 'classnames';

export default function Input(props) {
  const { name, errors, touched, ...rest } = props;
  const invalid = errors[name] && touched[name] ? styles.invalid : null;

  return (
    <Fragment>
      <Field name={name} >
        {({ field }) => {
          return (
            <MyInput
              className={invalid}
              {...field}
              {...rest}
            />
          );
        }}
      </Field>
      <ErrorMessage className={styles['error-message']} name={name} component='div' />
    </Fragment>
  );
}

// Previous Input

// import { Fragment } from 'react';
// import { Field, ErrorMessage } from 'formik';
// import InputText from 'primereact/inputtext';
// import MyInput from './MyInput';
// import styles from './Formik.module.css';
// import cn from 'classnames';

// export default function Input(props) {
//   const { name, errors, touched, ...rest } = props;
//   const invalid = errors[name] && touched[name] ? styles.invalid : null;

//   return (
//     <Fragment>
//       <Field name={name} >
//         {({ field }) => {
//           return (
//             <MyInput
//               className={invalid}
//               {...field}
//               {...rest}
//             />
//           );
//         }}
//       </Field>
//       <ErrorMessage className={styles['error-message']} name={name} component='div' />
//     </Fragment>
//   );
// }

// Previous Input with copied input styles

// import { Fragment } from 'react';
// import { Field, ErrorMessage } from 'formik';
// import styles from './Formik.module.css';
// import cn from 'classnames';

// export default function Input(props) {
//   const { name, label, errors, touched, ...rest } = props;
//   const invalid = errors[name] && touched[name] ? styles.invalid : null;

//   return (
//     <Fragment>
//       <Field className={cn(styles.input, invalid)} name={name} {...rest} />
//       <ErrorMessage component='div' className={styles['error-message']} name={name} />
//     </Fragment>
//   );
// }
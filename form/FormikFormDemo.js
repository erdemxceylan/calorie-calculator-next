
import { Fragment, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import styles from './FormDemo.module.css';
import { CONSTANTS } from '../global/constants';
import * as Yup from 'yup';

const DAILY_CALORIE_NEED = 'dailyCalorieNeed';
const WEIGHT = 'weight';
const FAT_RATIO = 'fatRatio';
const FITNESS_GOAL = 'fitnessGoal';
const NUMBER = 'number';

export const FormikFormDemo = () => {
   const [showMessage, setShowMessage] = useState(false);
   const [formData, setFormData] = useState({});

   // const choices = [
   //    { key: CONSTANTS.WEIGHT_GAIN, value: CONSTANTS.WEIGHT_GAIN },
   //    { key: CONSTANTS.WEIGHT_LOSS, value: CONSTANTS.WEIGHT_LOSS },
   // ];

   const validationSchema = Yup.object({
      dailyCalorieNeed: Yup.number().min(1).max(10000).required('Please enter your daily calorie need'),
      weight: Yup.number().min(1).max(1000).required('Please enter your weight'),
      fatRatio: Yup.number().min(1).max(99).required('Please enter your fat ratio'),
      fitnessGoal: Yup.string().required('Please choose a fitness goal'),
   });


   const formik = useFormik({
      initialValues: {
         dailyCalorieNeed: '',
         weight: '',
         fatRatio: '',
         // fitnessGoal: CONSTANTS.WEIGHT_GAIN
      },
      // validate: validationSchema,
      validate: (data) => {
         let errors = {};

         if (!data.dailyCalorieNeed) {
            errors.dailyCalorieNeed = 'required.';
         }

         if (!data.weight) {
            errors.weight = 'required.';
         }
         // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
         //    errors.email = 'Invalid email address. E.g. example@email.com';
         // }

         if (!data.fatRatio) {
            errors.fatRatio = 'required.';
         }

         // if (!data.fitnessGoal) {
         //    errors.fitnessGoal = 'required';
         // }

         return errors;
      },
      onSubmit: (data) => {
         setFormData(data);
         setShowMessage(true);

         formik.resetForm();
      }
   });

   const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
   const getFormErrorMessage = (name) => {
      return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
   };

   const dialogFooter = (
      <div className="flex justify-content-center">
         <Button
            label="OK"
            className="p-button-text"
            autoFocus
            onClick={() => setShowMessage(false)}
         />
      </div>
   );
   // const passwordHeader = <h6>Pick a password</h6>;
   // const passwordFooter = (
   //    <Fragment>
   //       <Divider />
   //       <p className="mt-2">Suggestions</p>
   //       <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
   //          <li>At least one lowercase</li>
   //          <li>At least one uppercase</li>
   //          <li>At least one numeric</li>
   //          <li>Minimum 8 characters</li>
   //       </ul>
   //    </Fragment>
   // );

   return (
      <div className={styles["form-demo"]}>
         <Dialog
            visible={showMessage}
            onHide={() => setShowMessage(false)}
            position="top"
            footer={dialogFooter}
            showHeader={false}
            breakpoints={{ '960px': '80vw' }}
            style={{ width: '30vw' }}
         >
            <div className="flex align-items-center flex-column pt-6 px-3">
               <i
                  className="pi pi-check-circle"
                  style={{ fontSize: '5rem', color: 'var(--green-500)' }}
               ></i>
               <h5>Registration Successful!</h5>
               <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                  Your account is registered under name
                  <b>{formData.name}</b> ;
                  it'll be valid next 30 days without activation.
                  Please check <b>{formData.email}</b> for activation instructions.
               </p>
            </div>
         </Dialog>

         <div className="flex justify-content-center">
            <div className="card">
               <h5 className="text-center">Data Settings</h5>
               <form onSubmit={formik.handleSubmit} className="p-fluid">
                  <div className="field">
                     {/* <span className="p-float-label"> */}
                     <InputText
                        id={DAILY_CALORIE_NEED}
                        name={DAILY_CALORIE_NEED}
                        type={NUMBER}
                        placeholder='Daily Calorie Need'
                        value={formik.values.dailyCalorieNeed}
                        onChange={formik.handleChange}
                        autoFocus
                        className={classNames({ 'p-invalid': isFormFieldValid(DAILY_CALORIE_NEED) })}
                     />
                     {/* <label
                           htmlFor="dailyCalorieNeed"
                           className={classNames({ 'p-error': isFormFieldValid('name') })}
                        >
                           Daily Calorie Need*
                        </label> */}
                     {/* </span> */}
                     {getFormErrorMessage(DAILY_CALORIE_NEED)}
                  </div>
                  <div className="field">
                     {/* <span className="p-float-label p-input-icon-right"> */}
                     {/* <i className="pi pi-envelope" /> */}
                     <InputText
                        id={WEIGHT}
                        name={WEIGHT}
                        type={NUMBER}
                        placeholder='Weight'
                        value={formik.values.weight}
                        onChange={formik.handleChange}
                        className={classNames({ 'p-invalid': isFormFieldValid(WEIGHT) })}
                     />
                     {/* <label
                           htmlFor="email"
                           className={classNames({ 'p-error': isFormFieldValid('email') })}
                        >Email*
                        </label> */}
                     {/* </span> */}
                     {getFormErrorMessage(WEIGHT)}
                  </div>
                  <div className="field">
                     {/* <span className="p-float-label"> */}
                     <InputText
                        id={FAT_RATIO}
                        name={FAT_RATIO}
                        type={NUMBER}
                        placeholder='Fat Ratio'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        // toggleMask
                        className={classNames({ 'p-invalid': isFormFieldValid(FAT_RATIO) })}
                     // header={passwordHeader}
                     // footer={passwordFooter}
                     />
                     {/* <label
                           htmlFor="password"
                           className={classNames({ 'p-error': isFormFieldValid('password') })}
                        >
                           Password*
                        </label> */}
                     {/* </span> */}
                     {getFormErrorMessage(FAT_RATIO)}
                  </div>
                  {/* <div className="field">
                     <span className="p-float-label">
                        <Calendar
                           id="date"
                           name="date"
                           value={formik.values.date}
                           onChange={formik.handleChange}
                           dateFormat="dd/mm/yy"
                           mask="99/99/9999"
                           showIcon
                        />
                        <label htmlFor="date">Birthday</label>
                     </span>
                  </div>
                  <div className="field-checkbox">
                     <Checkbox
                        inputId="accept"
                        name="accept"
                        checked={formik.values.accept}
                        onChange={formik.handleChange}
                        className={classNames({ 'p-invalid': isFormFieldValid('accept') })}
                     />
                     <label
                        htmlFor="accept"
                        className={classNames({ 'p-error': isFormFieldValid('accept') })}
                     >
                        I agree to the terms and conditions*
                     </label>
                  </div> */}

                  <Button type="submit" label="Submit" className="mt-2" />
               </form>
            </div>
         </div>
      </div>
   );
};

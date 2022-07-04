import * as Yup from 'yup';
import FormModal from '../../ui/form-modal/FormModal';

export default function DataSettings(props) {
   const inputs = [
      { name: 'dailyCalorieNeed', placeholder: 'Daily Calorie Need', type: 'number', initialValue: '' },
      { name: 'weight', placeholder: 'Weight', type: 'number', initialValue: '' },
      { name: 'fatRatio', placeholder: 'Fat Ratio', type: 'number', initialValue: '' },
      { name: 'fitnessGoal', placeholder: 'Fitness Goal', type: 'radio', initialValue: '', selections: [{ value: 'Weight Gain' }, { value: 'Weight Loss' }] }
   ];

   const validationSchema = Yup.object({
      dailyCalorieNeed: Yup.number()
         .positive('Daily calorie need must be positive')
         .integer('Daily calorie need must be an integer')
         .max(10000, 'Daily calorie need can be 10000 maximum')
         .required('Please enter your daily calorie need'),
      weight: Yup.number()
         .positive('Weight must be positive')
         .integer('Weight must be an integer')
         .max(1000, 'Weight can be 1000 maximum')
         .required('Please enter your weight'),
      fatRatio: Yup.number()
         .positive('Fat ratio must be positive')
         .integer('Fat ratio must be an integer')
         .max(99, 'Fat ratio can be 99 maximum')
         .required('Please enter your fat ratio'),
      fitnessGoal: Yup.string().required('Please select your fitness goal')
   });

   function submitHandler(values) {  // ({dailyCalorieNeed, weight, fatRatio, fitnessGoal}) instead of (values)
      console.log(values);
   }

   return (
      <FormModal
         header='Data Settings'
         visible={props.visible}
         onHide={props.onHide}
         inputs={inputs}
         validationSchema={validationSchema}
         onSubmit={submitHandler}
         submitButtonLabel='Submit'
         resizable={false}
         draggable={false}
      />
   );
}
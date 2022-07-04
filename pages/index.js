import MyForm from '../myform/MyForm';
import * as Yup from 'yup';

export default function HomePage(props) {
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

  const inputs = [
    { name: 'dailyCalorieNeed', placeholder: 'Daily Calorie Need', type: 'number', initialValue: '' },
    { name: 'weight', placeholder: 'Weight', type: 'number', initialValue: '' },
    { name: 'fatRatio', placeholder: 'Fat Ratio', type: 'number', initialValue: '' },
    { name: 'fitnessGoal', placeholder: 'Fitness Goal', type: 'radio', initialValue: '', selections: [{ value: 'Weight Gain' }, { value: 'Weight Loss' }] }
  ];

  function submitHandler(values) {  // ({dailyCalorieNeed, weight, fatRatio, fitnessGoal}) instead of (values)
    console.log(values);
  }

  return (
    <MyForm
      inputs={inputs}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
      submitButtonLabel='Submit'
    />
  );
}


// import axios from 'axios';
// import Home from '../components/home/Home';
// import { CONSTANTS } from './api/constants';

// export default function HomePage(props) {
//   return <Home nutrients={props.nutrients} dailyTargetValues={props.dailyTargetValues} />;
// }

// export async function getServerSideProps() {
//   // Fetching nutrients
//   let nutrients = [];

//   const nutrientsResponse = await axios.get(`${CONSTANTS.NUTRIENTS_URL}.json`);

//   for (const key in nutrientsResponse.data) {
//     nutrients.push({
//       id: key,
//       name: nutrientsResponse.data[key].name,
//       unit: nutrientsResponse.data[key].unit,
//       calories: nutrientsResponse.data[key].calories,
//       proteins: nutrientsResponse.data[key].proteins
//     });
//   }

//   // Fetching daily target values
//   let dataSettings = {};
//   let dailyCalorieTargetLowerBound = 0;
//   let dailyCalorieTargetUpperBound = 0;
//   let dailyProteinNeed = 0;

//   const settingsResponse = await axios.get(`${CONSTANTS.SETTINGS_URL}.json`);

//   for (const key in settingsResponse.data) {
//     dataSettings = {
//       dailyCalorieNeed: settingsResponse.data[key].dailyCalorieNeed,
//       weight: settingsResponse.data[key].weight,
//       fatRatio: settingsResponse.data[key].fatRatio,
//       fitnessGoal: settingsResponse.data[key].fitnessGoal
//     };
//   }

//   const fatlessWeight = dataSettings.weight * (100 - dataSettings.fatRatio) / 100;

//   switch (dataSettings.fitnessGoal) {
//     case CONSTANTS.WEIGHT_GAIN:
//       dailyCalorieTargetLowerBound = dataSettings.dailyCalorieNeed;
//       dailyCalorieTargetUpperBound = dataSettings.dailyCalorieNeed + 300;
//       dailyProteinNeed = fatlessWeight * 2;
//       break;
//     case CONSTANTS.WEIGHT_LOSS:
//       dailyCalorieTargetLowerBound = dataSettings.dailyCalorieNeed - 500;
//       dailyCalorieTargetUpperBound = dataSettings.dailyCalorieNeed;
//       dailyProteinNeed = fatlessWeight * 1.5;
//       break;
//   }

//   const dailyTargetValues = {
//     dailyCalorieTargetLowerBound,
//     dailyCalorieTargetUpperBound,
//     dailyProteinNeed
//   };

//   return { props: { nutrients, dailyTargetValues } };
// }
import axios from 'axios';
import Home from '../components/home/Home.js';
import { CONSTANTS } from './api/constants';

export default function HomePage(props) {
   return (
      <Home
         nutrients={props.nutrients}
         dataSettings={props.dataSettings}
         dailyTargetValues={props.dailyTargetValues}
      />
   );
}

export async function getServerSideProps({ locale }) {
   // Fetching nutrients
   let nutrients = [];

   const nutrientsResponse = await axios.get(`${CONSTANTS.NUTRIENTS_URL}.json`);

   for (const key in nutrientsResponse.data) {
      nutrients.push({
         id: key,
         name: nutrientsResponse.data[key].name,
         unit: nutrientsResponse.data[key].unit,
         calories: nutrientsResponse.data[key].calories,
         proteins: nutrientsResponse.data[key].proteins
      });
   }

   // Fetching data settings and constructing daily target values
   let dataSettings = {};
   let dailyCalorieTargetLowerBound = 0;
   let dailyCalorieTargetUpperBound = 0;
   let dailyProteinNeed = 0;

   const settingsResponse = await axios.get(`${CONSTANTS.SETTINGS_URL}.json`);

   for (const key in settingsResponse.data) {
      dataSettings = {
         dailyCalorieNeed: settingsResponse.data[key].dailyCalorieNeed,
         weight: settingsResponse.data[key].weight,
         fatRatio: settingsResponse.data[key].fatRatio,
         fitnessGoal: settingsResponse.data[key].fitnessGoal
      };
   }

   const fatlessWeight = dataSettings.weight * (100 - dataSettings.fatRatio) / 100;

   switch (dataSettings.fitnessGoal) {
      case CONSTANTS.WEIGHT_GAIN:
         dailyCalorieTargetLowerBound = dataSettings.dailyCalorieNeed;
         dailyCalorieTargetUpperBound = dataSettings.dailyCalorieNeed + 300;
         dailyProteinNeed = fatlessWeight * 2;
         break;
      case CONSTANTS.WEIGHT_LOSS:
         dailyCalorieTargetLowerBound = dataSettings.dailyCalorieNeed - 500;
         dailyCalorieTargetUpperBound = dataSettings.dailyCalorieNeed;
         dailyProteinNeed = fatlessWeight * 1.5;
         break;
   }

   const dailyTargetValues = {
      dailyCalorieTargetLowerBound,
      dailyCalorieTargetUpperBound,
      dailyProteinNeed
   };

   return { props: { nutrients, dataSettings, dailyTargetValues, locale } };
}
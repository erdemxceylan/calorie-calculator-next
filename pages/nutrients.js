import { CONSTANTS } from '../pages/api/constants';
import axios from 'axios';
import NutrientList from '../components/nutrients';

export default function NutrientPage(props) {
   return <NutrientList nutrients={props.nutrients} />;
}

export async function getServerSideProps() {
   // Fetching nutrients
   let nutrients = [];

   const response = await axios.get(`${CONSTANTS.NUTRIENTS_URL}.json`);

   for (const key in response.data) {
      nutrients.push({
         id: key,
         name: response.data[key].name,
         unit: response.data[key].unit,
         calories: response.data[key].calories,
         proteins: response.data[key].proteins
      });
   }

   return { props: { nutrients } };
}
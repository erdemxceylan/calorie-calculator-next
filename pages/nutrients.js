import axios from 'axios';
import { useState } from 'react';
import NutrientList from '../components/nutrients/NutrientList';
import { CONSTANTS } from '../pages/api/constants';

export default function NutrientPage(props) {
   return <NutrientList nutrients={props.nutrients} />;
}

export async function getStaticProps() {
   // Fetching nutrients
   let nutrients = [];

   const response = await axios.get(`${CONSTANTS.BASE_URL}/${CONSTANTS.NUTRIENTS}.json`);

   for (const key in response.data) {
      nutrients.push({
         id: key,
         name: response.data[key].name,
         unit: response.data[key].unit,
         calories: response.data[key].calories,
         proteins: response.data[key].proteins
      });
   }

   // const [nutrients, setNutrients] = useState([]);

   // axios.get(`${CONSTANTS.BASE_URL}/${CONSTANTS.NUTRIENTS}.json`).then(response => {
   //    let loadedNutrients = [];
   //    for (const key in response.data) {
   //       loadedNutrients.push({
   //          id: key,
   //          name: response.data[key].name,
   //          unit: response.data[key].unit,
   //          calories: response.data[key].calories,
   //          proteins: response.data[key].proteins
   //       });
   //    }
   //    setNutrients(loadedNutrients);
   // });

   return { props: { nutrients } };
}
import axios from 'axios';
import NutrientList from '../components/nutrients/NutrientList';

export default function NutrientPage(props) {
   return <NutrientList nutrients={props.nutrients} />;
}

export async function getStaticProps() {
   const response = await axios.get('http://localhost:8080/nutrients');
   return { props: { nutrients: response.data } };
}
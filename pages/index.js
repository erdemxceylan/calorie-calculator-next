import axios from 'axios';
import Home from '../components/home/Home';

export default function HomePage(props) {
  return <Home nutrients={props.nutrients} dailyTargetValues={props.dailyTargetValues} />;
}

export async function getStaticProps() {
  const nutrientsResponse = await axios.get('http://localhost:8080/nutrients');
  const settingsResponse = await axios.get('http://localhost:8080/settings');
  return { props: { nutrients: nutrientsResponse.data, dailyTargetValues: settingsResponse.data } };
}
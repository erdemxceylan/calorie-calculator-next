import axios from 'axios';
import Home from '../components/home/Home';

export default function HomePage(props) {
  return <Home nutrients={props.nutrients} />;
}

export async function getStaticProps() {
  const response = await axios.get('http://localhost:8080/nutrients');

  return { props: { nutrients: response.data } };
}
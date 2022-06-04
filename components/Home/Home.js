import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import AddNutrientMenu from './components/AddNutrientMenu';
import ConsumedNutrientsTable from './components/ConsumedNutrientsTable';

export default function Home(props) {
   const isEmpty = useSelector(state => state.consumedNutrients.isEmpty);

   return (
      <Fragment>
         <AddNutrientMenu nutrients={props.nutrients} />
         {!isEmpty && <ConsumedNutrientsTable />}
      </Fragment>
   );
}
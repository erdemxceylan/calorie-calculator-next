import { Fragment } from 'react';
// import { useSelector } from 'react-redux';
import AddNutrientMenu from './components/AddNutrientMenu';
import ConsumedNutrientsTable from './components/ConsumedNutrientsTable';

export default function Home() {
   // const isEmpty = useSelector(state => state.consumedNutrients.isEmpty);
   const isEmpty = true;

   return (
      <Fragment>
         <AddNutrientMenu />
         {!isEmpty && <ConsumedNutrientsTable />}
      </Fragment>
   );
}
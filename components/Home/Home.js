import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import AddNutrientMenu from './components/AddNutrientMenu';
import ConsumedNutrientsTable from './components/ConsumedNutrientsTable';
import DataMenu from './components/DataMenu';

export default function Home(props) {
   const isEmpty = useSelector(state => state.consumedNutrients.isEmpty);

   return (
      <Fragment>
         <DataMenu bodyData={props.dataSettings} />
         <AddNutrientMenu nutrients={props.nutrients} />
         {!isEmpty && <ConsumedNutrientsTable dailyTargetValues={props.dailyTargetValues} />}
      </Fragment>
   );
}
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import AddNutrientMenu from './utils/AddNutrientMenu';
import ConsumedNutrientsTable from './utils/ConsumedNutrientsTable';
import DataMenu from './utils/DataMenu';

export default function Home(props) {
   const isEmpty = useSelector(state => state.consumedNutrients.isEmpty);

   return (
      <Fragment>
         <DataMenu dataSettings={props.dataSettings} />
         <AddNutrientMenu nutrients={props.nutrients} />
         {!isEmpty && <ConsumedNutrientsTable dailyTargetValues={props.dailyTargetValues} />}
      </Fragment>
   );
}
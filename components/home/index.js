import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import DataMenu from './body-data';
import Selection from './selection';
import ConsumedNutrientsTable from './table';

export default function Home(props) {
   const isEmpty = useSelector(state => state.consumedNutrients.isEmpty);

   return (
      <Fragment>
         <DataMenu dataSettings={props.dataSettings} />
         <Selection nutrients={props.nutrients} />
         {!isEmpty && <ConsumedNutrientsTable dailyTargetValues={props.dailyTargetValues} />}
      </Fragment>
   );
}
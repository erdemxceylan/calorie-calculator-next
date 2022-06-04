import { Fragment, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import TotalValues from './TotalValues';
import { consumedNutrientsActions } from '../../../global/redux/consumed-nutrients';
import styles from './ConsumedNutrientsTable.module.css';
import cn from 'classnames';
import AuthContext from '../../../global/context/auth';

const NAME = 'Name';
const QUANTITY = 'Quantity';
const CALORIES = 'Calories';
const PROTEINS = 'Proteins';
const NUTRIENT_NAME = 'name';
const CONSUMED_QUANTITY = 'consumedQuantity';
const CALORIES_TAKEN = 'caloriesTaken';
const PROTEINS_TAKEN = 'proteinsTaken';

export default function ConsumedNutrientsTable() {

   const consumedNutrients = useSelector(state => state.consumedNutrients.consumedNutrients);
   const dispatch = useDispatch();
   const auth = useContext(AuthContext);

   const consumedNutrientsTableColumns = [
      { field: NUTRIENT_NAME, header: NAME },
      { field: CONSUMED_QUANTITY, header: QUANTITY },
      { field: CALORIES_TAKEN, header: CALORIES },
      { field: PROTEINS_TAKEN, header: PROTEINS }
   ];

   function labelField(rowData, field) {
      switch (field) {
         case NUTRIENT_NAME:
            return rowData.name;
         case CONSUMED_QUANTITY:
            return `${rowData.consumedQuantity} ${rowData.unit}`;
         case CALORIES_TAKEN:
            return rowData.caloriesTaken.toFixed(2) + ' kcal';
         case PROTEINS_TAKEN:
            return rowData.proteinsTaken.toFixed(2) + ' gram';
         default:
            return;
      }
   }

   function quantityEditor(options) {
      return <InputText
         className={styles.quantity}
         type='number'
         min={0}
         value={options.value}
         onChange={(e) => options.editorCallback(e.target.value)}
      />;
   }

   function rowEditCompletionHandler(event) {
      let { index, newData, originalEvent } = event;
      const newValue = newData.consumedQuantity;
      const rowData = consumedNutrients[index];

      if (newValue === rowData.consumedQuantity) {
         return;
      } else if (Number(newValue) > 0) {
         const nutrient = {
            id: rowData.id,
            name: rowData.name,
            consumedQuantity: newValue,
            caloriesTaken: rowData.caloriesTaken * +newValue / +rowData.consumedQuantity,
            proteinsTaken: rowData.proteinsTaken * +newValue / +rowData.consumedQuantity
         };
         dispatch(consumedNutrientsActions.update(nutrient));
      } else if (Number(newValue) === 0) {
         const nutrient = {
            id: rowData.id,
            calories: rowData.caloriesTaken,
            proteins: rowData.proteinsTaken
         };
         dispatch(consumedNutrientsActions.delete(nutrient));
      } else {
         originalEvent.preventDefault();
      }
   }

   return (
      <Fragment>
         <div className={cn('card p-fluid', 'table')}>
            <DataTable
               value={consumedNutrients}
               editMode='row'
               onRowEditComplete={rowEditCompletionHandler}
               responsiveLayout='scroll'
               footer={<TotalValues />}
            >
               {consumedNutrientsTableColumns.map(({ field, header }) => {
                  if (field === CONSUMED_QUANTITY) {
                     return <Column
                        key={field}
                        field={field}
                        header={header}
                        body={rowData => labelField(rowData, field)}
                        editor={options => quantityEditor(options)}
                     />;
                  } else {
                     return <Column
                        key={field}
                        field={field}
                        header={header}
                        body={rowData => labelField(rowData, field)}
                     />;
                  }
               })}
               <Column
                  header='Edit'
                  rowEditor headerStyle={{ width: '8rem', minWidth: '8rem' }}
                  bodyStyle={{ textAlign: 'center' }}
               />
            </DataTable>
         </div>
         {auth.isLoggedIn && <Button label='Save List' />}
      </Fragment>
   );
}
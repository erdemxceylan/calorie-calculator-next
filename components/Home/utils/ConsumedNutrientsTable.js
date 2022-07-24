import { Fragment, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { consumedNutrientsActions } from '../../../global/redux/consumed-nutrients';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import AuthContext from '../../../global/context/auth';
import Header from '../../../ui/table/Header';
import Numbers from '../../../ui/table/columns/Numbers';
import Edition from '../../../ui/table/columns/Edition';
import Deletion from '../../../ui/table/columns/Deletion';
import IconButton from '../../../ui/table/button/IconButton';
import Totals from './Totals';
import styles from './ConsumedNutrientsTable.module.css';
import cn from 'classnames';

const NAME = 'Name';
const QUANTITY = 'Quantity';
const CALORIES = 'Calories';
const PROTEINS = 'Proteins';
const NUTRIENT_NAME = 'name';
const CONSUMED_QUANTITY = 'consumedQuantity';
const CALORIES_TAKEN = 'caloriesTaken';
const PROTEINS_TAKEN = 'proteinsTaken';

export default function ConsumedNutrientsTable(props) {
   const consumedNutrients = useSelector(state => state.consumedNutrients.consumedNutrients);
   const indexedConsumedNutrients = consumedNutrients.map((nutrient, index) => { return { index, ...nutrient }; });
   const auth = useContext(AuthContext);
   const dispatch = useDispatch();

   const consumedNutrientsColumnHeaders = [
      { field: NUTRIENT_NAME, header: NAME },
      { field: CONSUMED_QUANTITY, header: QUANTITY },
      { field: CALORIES_TAKEN, header: CALORIES },
      { field: PROTEINS_TAKEN, header: PROTEINS }
   ];

   const consumedNutrientsColumns = consumedNutrientsColumnHeaders.map(({ field, header }) => {
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
   });

   const headerContent = (
      <Fragment>
         {auth.isLoggedIn && <IconButton icon='pi pi-save' />}
         <IconButton icon='pi pi-times-circle' onClick={() => console.log('Clicked')} />
      </Fragment>
   );

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

   function deletionButton(data) {
      return <IconButton icon='pi pi-trash' onClick={() => dispatch(consumedNutrientsActions.delete({
         id: data.id,
         calories: data.caloriesTaken,
         proteins: data.proteinsTaken
      }))} />;
   }

   return (
      <Fragment>
         <Header title='Consumed Nutrients' content={headerContent} />
         <div className={cn('card p-fluid', 'table')}>
            <DataTable
               value={indexedConsumedNutrients}
               editMode='row'
               onRowEditComplete={rowEditCompletionHandler}
               responsiveLayout='scroll'
               footer={<Totals dailyTargetValues={props.dailyTargetValues} />}
            >
               <Numbers header='No' body={rowData => rowData.index + 1} />
               {consumedNutrientsColumns}
               <Edition header='Edit' rowEditor />
               <Deletion header='Delete' body={rowData => deletionButton(rowData)} />
            </DataTable>
         </div>
      </Fragment>
   );
}
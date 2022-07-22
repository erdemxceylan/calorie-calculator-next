import { useRouter } from 'next/router';
import { Fragment, useContext, useState } from 'react';
import useHttpRequest from '../../hooks/use-http-request';
import AddNewNutrient from '../modals/AddNewNutrient';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { CONSTANTS } from '../../global/constants';
import AuthContext from '../../global/context/auth';
import styles from './NutrientList.module.css';
import cn from 'classnames';

const NAME = 'Name';
const UNIT = 'Unit';
const CALORIES = 'Calories';
const PROTEINS = 'Proteins';
const NAME_FIELD = 'name';
const UNIT_FIELD = 'unit';
const CALORIES_FIELD = 'calories';
const PROTEINS_FIELD = 'proteins';

export default function NutrientList(props) {
   const nutrients = props.nutrients.map((nutrient, index) => { return { index, ...nutrient }; });
   const [displayAddNewNutrient, setDisplayAddNewNutrient] = useState(false);
   const router = useRouter();
   const auth = useContext(AuthContext);
   const { sendRequest: updateNutrient } = useHttpRequest();
   const { sendRequest: deleteNutrient } = useHttpRequest();

   const nutrientListColumnHeaders = [
      { field: NAME_FIELD, header: NAME },
      { field: UNIT_FIELD, header: UNIT },
      { field: CALORIES_FIELD, header: CALORIES },
      { field: PROTEINS_FIELD, header: PROTEINS }
   ];

   const addNewNutrientButton = (
      <Button
         className={cn(styles.button, 'button')}
         label='Add New Nutrient'
         icon='pi pi-plus'
         onClick={setDisplayAddNewNutrient.bind(null, true)}
      />
   );

   const numberColumn = (
      <Column
         header='No'
         headerStyle={{ width: '2rem', minWidth: '2rem' }}
         bodyStyle={{ textAlign: 'center' }}
         body={rowData => rowData.index + 1}
      />
   );

   const nutrientListColumns = nutrientListColumnHeaders.map(({ field, header }) => {
      return <Column
         key={field}
         field={field}
         header={header}
         body={rowData => labelField(rowData, field)}
         editor={options => editor(options, field)}
      />;
   });

   const editionColumn = (
      <Column
         header='Edit'
         rowEditor headerStyle={{ width: '8rem', minWidth: '8rem' }}
         bodyStyle={{ textAlign: 'center' }}
      />
   );

   const deletionColumn = (
      <Column
         header='Delete'
         headerStyle={{ width: '5rem', minWidth: '5rem' }}
         bodyStyle={{ textAlign: 'center' }}
         body={rowData => deletionButton(rowData)}
      />
   );

   function editor(options, field) {
      if ([CALORIES_FIELD, PROTEINS_FIELD].includes(field)) {
         return <InputText
            className={styles.input}
            type='number'
            min={0}
            value={options.value}
            onChange={(e) => options.editorCallback(e.target.value)}
         />;
      }
      return <InputText
         className={styles.input}
         value={options.value}
         onChange={(e) => options.editorCallback(e.target.value)}
      />;
   }

   function labelField(rowData, field) {
      switch (field) {
         case NAME_FIELD:
            return rowData.name;
         case UNIT_FIELD:
            return `1 ${rowData.unit}`;
         case CALORIES_FIELD:
            return rowData.calories + ' kcal';
         case PROTEINS_FIELD:
            return rowData.proteins + ' gram';
         default:
            return;
      }
   }

   function rowEditCompletionHandler(event) {
      let { newData: updatedNutrient } = event;

      const url = CONSTANTS.UPDATE_NUTRIENT_URL;
      const method = CONSTANTS.PUT;
      const body = {
         id: updatedNutrient.id,
         name: updatedNutrient.name,
         calories: Number(updatedNutrient.calories),
         proteins: Number(updatedNutrient.proteins),
         unit: updatedNutrient.unit,
      };

      updateNutrient({ url, method, body });

      router.push(CONSTANTS.NUTRIENTS_PAGE);
   }

   function deletionButton(rowData) {
      return (
         <Button
            icon='pi pi-trash'
            className={'deletion-button'}
            onClick={deletionHandler.bind(null, rowData.id)}
         />
      );
   }

   function deletionHandler(selectedNutrientId) {
      const url = CONSTANTS.DELETE_NUTRIENT_URL;
      const method = CONSTANTS.DELETE;
      const body = { id: selectedNutrientId };

      deleteNutrient({ url, method, body });

      router.push(CONSTANTS.NUTRIENTS_PAGE);
   }

   return (
      <Fragment>
         {auth.isAdminLoggedIn && addNewNutrientButton}
         <div className={cn('card p-fluid', 'table')}>
            <DataTable
               value={nutrients}
               editMode='row'
               onRowEditComplete={rowEditCompletionHandler}
               responsiveLayout='scroll'
            >
               {numberColumn}
               {nutrientListColumns}
               {auth.isAdminLoggedIn && editionColumn}
               {auth.isAdminLoggedIn && deletionColumn}
            </DataTable>
         </div>
         <AddNewNutrient
            visible={displayAddNewNutrient}
            onHide={setDisplayAddNewNutrient.bind(null, false)}
         />
      </Fragment>
   );
}
import { Fragment, useContext, useState } from 'react';
// import useHttpRequest from '../../hooks/use-http-request';
// import DatabaseContext from '../../global/context/database';
import AddNutrientModal from '../modals/AddNutrientModal/AddNutrientModal';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import styles from './NutrientList.module.css';
import cn from 'classnames';
import AuthContext from '../../global/context/auth';

// import DUMMY_NUTRIENTS from '../../test/dummy-nutrients';

const NAME = 'Name';
const UNIT = 'Unit';
const CALORIES = 'Calories';
const PROTEINS = 'Proteins';
const NAME_FIELD = 'name';
const UNIT_FIELD = 'unit';
const CALORIES_FIELD = 'calories';
const PROTEINS_FIELD = 'proteins';
// const DELETE = 'DELETE';
// const PUT = 'PUT';
// const UPDATE_URL = 'http://localhost:8080/update-nutrient';
// const DELETE_URL = 'http://localhost:8080/delete-nutrient';

export default function NutrientList(props) {
   const [displayAddNutrientModal, setDisplayAddNutrientModal] = useState(false);
   // const database = useContext(DatabaseContext);
   const auth = useContext(AuthContext);
   // const { sendRequest: sendUpdateRequest } = useHttpRequest();
   // const { sendRequest: sendDeleteRequest } = useHttpRequest();

   const nutrientListColumnHeaders = [
      { field: NAME_FIELD, header: NAME },
      { field: UNIT_FIELD, header: UNIT },
      { field: CALORIES_FIELD, header: CALORIES },
      { field: PROTEINS_FIELD, header: PROTEINS }
   ];

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
      // let { newData: updatedNutrient } = event;

      // sendUpdateRequest({
      //    url: UPDATE_URL,
      //    method: PUT,
      //    body: {
      //       id: updatedNutrient.id,
      //       name: updatedNutrient.name,
      //       calories: Number(updatedNutrient.calories),
      //       proteins: Number(updatedNutrient.proteins),
      //       unit: updatedNutrient.unit,
      //    }
      // }, database.updateNutrients);
   }

   function deletionHandler(selectedNutrientId) {
      // sendDeleteRequest({
      //    url: DELETE_URL,
      //    method: DELETE,
      //    body: { id: selectedNutrientId }
      // }, database.updateNutrients);
   }

   function deletionButton(rowData) {
      return (
         <Button
            icon='pi pi-trash'
            className={styles['deletion-button']}
            onClick={deletionHandler.bind(null, rowData.id)}
         />
      );
   }

   const addNewNutrientButton = (
      <Button
         className={cn('p-button-success', styles.button)}
         label='Add New Nutrient'
         icon='pi pi-plus'
         onClick={setDisplayAddNutrientModal.bind(null, true)}
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
         bodyStyle={{ textAlign: 'center' }}
         body={rowData => deletionButton(rowData)}
      />
   );

   return (
      <Fragment>
         {auth.isAdminLoggedIn && addNewNutrientButton}
         <div className={cn('card p-fluid', 'table')}>
            <DataTable
               value={props.nutrients}
               editMode='row'
               onRowEditComplete={rowEditCompletionHandler}
               responsiveLayout='scroll'
            >
               {nutrientListColumns}
               {auth.isAdminLoggedIn && editionColumn}
               {auth.isAdminLoggedIn && deletionColumn}
            </DataTable>
         </div>
         <AddNutrientModal
            visible={displayAddNutrientModal}
            onHide={setDisplayAddNutrientModal.bind(null, false)}
         />
      </Fragment>
   );
}
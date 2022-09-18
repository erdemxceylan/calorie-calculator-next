import { useRouter } from 'next/router';
import { Fragment, useContext, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { CONSTANTS } from '../../global/constants';
import AuthContext from '../../global/context/auth';
import useHttpRequest from '../../hooks/use-http-request';
import Header from '../../ui/table/header';
import Numeration from '../../ui/table/columns/numeration';
import Edition from '../../ui/table/columns/edition';
import Deletion from '../../ui/table/columns/deletion';
import IconButton from '../../ui/table/icon-button';
import AddNewNutrient from '../overlays/add-new-nutrient';
import styles from './styles.module.css';
import cn from 'classnames';

const { UPDATE_NUTRIENT_URL, PUT, DELETE_NUTRIENT_URL, DELETE, NUTRIENTS } = CONSTANTS;

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

   const nutrientListColumns = nutrientListColumnHeaders.map(({ field, header }) => {
      return <Column
         key={field}
         field={field}
         header={header}
         body={rowData => labelField(rowData, field)}
         editor={options => editor(options, field)}
      />;
   });

   const addNewNutrientButton = <IconButton icon='pi pi-plus' onClick={setDisplayAddNewNutrient.bind(null, true)} />;

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

   async function rowEditCompletionHandler(event) {
      let { newData: updatedNutrient } = event;

      const url = UPDATE_NUTRIENT_URL;
      const method = PUT;
      const body = {
         id: updatedNutrient.id,
         name: updatedNutrient.name,
         calories: Number(updatedNutrient.calories),
         proteins: Number(updatedNutrient.proteins),
         unit: updatedNutrient.unit,
      };

      await updateNutrient({ url, method, body });

      router.push(NUTRIENTS);
   }

   function deletionButton(data) {
      return <IconButton icon='pi pi-trash' onClick={deletionHandler.bind(null, data.id)} />;
   }

   async function deletionHandler(selectedNutrientId) {
      const url = DELETE_NUTRIENT_URL;
      const method = DELETE;
      const body = { id: selectedNutrientId };

      await deleteNutrient({ url, method, body });

      router.push(NUTRIENTS);
   }

   return (
      <Fragment>
         <Header title='Nutrient List' content={auth.isAdminLoggedIn ? addNewNutrientButton : null} />
         <div className={cn('card p-fluid', 'table')}>
            <DataTable
               value={nutrients}
               editMode='row'
               onRowEditComplete={rowEditCompletionHandler}
               responsiveLayout='scroll'
            >
               <Numeration header='No' body={rowData => rowData.index + 1} />
               {nutrientListColumns}
               {auth.isAdminLoggedIn && <Edition header='Edit' rowEditor />}
               {auth.isAdminLoggedIn && <Deletion header='Delete' body={rowData => deletionButton(rowData)} />}
            </DataTable>
         </div>
         <AddNewNutrient
            visible={displayAddNewNutrient}
            onHide={setDisplayAddNewNutrient.bind(null, false)}
         />
      </Fragment>
   );
}
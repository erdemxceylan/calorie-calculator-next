import { Fragment, useState } from 'react';
import { Button } from 'primereact/button';
import { CONSTANTS } from '../../../global/constants';
import styles from './DataMenu.module.css';
import DataSettings from '../../modals/DataSettings';

export default function DataMenu({ dataSettings }) {
   const [displayDataSettings, setDisplayDataSettings] = useState(false);

   const data = [
      { label: CONSTANTS.DCN, value: dataSettings.dailyCalorieNeed, unit: 'kcal' },
      { label: CONSTANTS.WEIGHT, value: dataSettings.weight, unit: 'kg' },
      { label: CONSTANTS.FAT_RATIO, value: dataSettings.fatRatio, unit: '%' },
      { label: CONSTANTS.FITNESS_GOAL, value: dataSettings.fitnessGoal }
   ];

   return (
      <Fragment>
         <div className={styles.container}>
            {data.map(group => (
               <div className={styles.group} key={group.label}>
                  <label>{group.label}:</label>
                  <p>{group.value} {group.unit}</p>
               </div>
            ))}
            <Button icon='pi pi-fw pi-cog' onClick={() => setDisplayDataSettings(true)} />
         </div>
         <DataSettings
            visible={displayDataSettings}
            onHide={setDisplayDataSettings.bind(null, false)}
            initialValues={dataSettings}
         />
      </Fragment>
   );
}
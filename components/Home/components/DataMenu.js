import { Fragment, useState } from 'react';
import { Button } from 'primereact/button';
import { CONSTANTS } from '../../../global/constants';
import DataSettings from '../../modals/DataSettings';
import styles from './DataMenu.module.css';
import cn from 'classnames';

export default function DataMenu({ dataSettings }) {
   const [displayDataSettings, setDisplayDataSettings] = useState(false);
   const [toggleMenu, setToggleMenu] = useState(false);

   const data = [
      { label: CONSTANTS.DCN, value: dataSettings.dailyCalorieNeed, unit: 'kcal' },
      { label: CONSTANTS.WEIGHT, value: dataSettings.weight, unit: 'kg' },
      { label: CONSTANTS.FAT_RATIO, value: dataSettings.fatRatio, unit: '%' },
      { label: CONSTANTS.FITNESS_GOAL, value: dataSettings.fitnessGoal }
   ];

   const visible = toggleMenu ? styles.visible : null;
   const border = toggleMenu ? styles['border-bottom'] : styles['border-top'];

   return (
      <Fragment>
         <div className={cn(styles.container, visible)}>
            {data.map(group => (
               <div className={styles.group} key={group.label}>
                  <label>{group.label}:</label>
                  <p>{group.value} {group.unit}</p>
               </div>
            ))}
            <Button
               className={styles.button}
               icon='pi pi-fw pi-cog'
               onClick={() => setDisplayDataSettings(true)}
            />
         </div>
         <div
            className={cn(styles.toggle, border)}
            onClick={() => setToggleMenu(state => !state)}
            icon='pi pi-fw pi-angle-up'
         >
            {toggleMenu ? 'up' : 'down'}
         </div>
         <DataSettings
            visible={displayDataSettings}
            onHide={setDisplayDataSettings.bind(null, false)}
            initialValues={dataSettings}
         />
      </Fragment>
   );
}
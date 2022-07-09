import { Button } from 'primereact/button';
import { CONSTANTS } from '../../../global/constants';
import styles from './DataMenu.module.css';

export default function DataMenu({ bodyData }) {

   const data = [
      { label: CONSTANTS.DCN, value: bodyData.dailyCalorieNeed, unit: 'kcal' },
      { label: CONSTANTS.WEIGHT, value: bodyData.weight, unit: 'kg' },
      { label: CONSTANTS.FAT_RATIO, value: bodyData.fatRatio, unit: '%' },
      { label: CONSTANTS.FITNESS_GOAL, value: bodyData.fitnessGoal }
   ];

   return (
      <div className={styles.container}>
         {data.map(x => (
            <div className={styles.group} key={x.label}>
               <label>{x.label}:</label>
               <p>{x.value} {x.unit}</p>
            </div>
         ))}
         <Button icon='pi pi-fw pi-cog' onClick={() => console.log('hi')} />
      </div>
   );
}
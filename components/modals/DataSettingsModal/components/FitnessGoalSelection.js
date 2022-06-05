import { useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { CONSTANTS } from '../../../../global/constants';
import styles from './FitnessGoalSelection.module.css';

const WEIGHT_GAIN = CONSTANTS.WEIGHT_GAIN;
const WEIGHT_LOSS = CONSTANTS.WEIGHT_LOSS;

export default function FitnessGoalSelection(props) {
   const [enteredFitnessGoal, setEnteredFitnessGoal] = useState(WEIGHT_GAIN);

   props.sendFitnessGoal(enteredFitnessGoal);

   return (
      <div className={styles.radio}>
         <h4>Fitness Goal</h4>
         <div className='p-field-radiobutton'>
            <RadioButton
               inputId={WEIGHT_GAIN}
               value={WEIGHT_GAIN}
               onChange={(e) => setEnteredFitnessGoal(e.value)}
               checked={enteredFitnessGoal === WEIGHT_GAIN}
            />
            <label htmlFor={WEIGHT_GAIN}>{WEIGHT_GAIN}</label>
         </div>
         <div className='p-field-radiobutton'>
            <RadioButton
               inputId={WEIGHT_LOSS}
               value={WEIGHT_LOSS}
               onChange={(e) => setEnteredFitnessGoal(e.value)}
               checked={enteredFitnessGoal === WEIGHT_LOSS}
            />
            <label htmlFor={WEIGHT_LOSS}>{WEIGHT_LOSS}</label>
         </div>
      </div>
   );
}
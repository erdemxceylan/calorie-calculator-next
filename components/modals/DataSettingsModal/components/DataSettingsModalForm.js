import DataSettingsModalInputs from './DataSettingsModalInputs';
import FitnessGoalSelection from './FitnessGoalSelection';
import styles from './DataSettingsModalForm.module.css';
import cn from 'classnames';

export default function DataSettingsModalForm(props) {

   function getInputData(data) {
      props.sendInputData(data);
   };

   function getFitnessGoal(goal) {
      props.sendFitnessGoal(goal);
   }

   return (
      <div className={cn('p-fluid', styles.form)}>
         <DataSettingsModalInputs sendInputData={getInputData} />
         <FitnessGoalSelection sendFitnessGoal={getFitnessGoal} />
      </div>
   );
}
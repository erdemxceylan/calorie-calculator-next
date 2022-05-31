import React from 'react';
import DataSettingsModalInputs from './DataSettingsModalInputs';
import FitnessGoalSelection from './FitnessGoalSelection';
import styles from './DataSettingsModalForm.module.css';
import cn from 'classnames';

function DataSettingsModalForm(props) {

   function getInputData(inputData) {
      props.sendInputData(inputData);
   };

   function getFitnessGoal(goal) {
      props.sendFitnessGoal(goal);
   }

   return (
      <div className={cn("p-fluid", styles.form)}>
         <DataSettingsModalInputs sendInputData={getInputData} />
         <FitnessGoalSelection sendFitnessGoal={getFitnessGoal} />
      </div>
   );
}

export default DataSettingsModalForm;

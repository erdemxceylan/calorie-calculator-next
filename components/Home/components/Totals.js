import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import styles from './Totals.module.css';

export default function Totals(props) {
   const totalCalories = useSelector(state => state.consumedNutrients.totalCalories).toFixed(2);
   const totalProteins = useSelector(state => state.consumedNutrients.totalProteins).toFixed(2);
   const dailyCalorieTargetLowerBound = props.dailyTargetValues.dailyCalorieTargetLowerBound;
   const dailyCalorieTargetUpperBound = props.dailyTargetValues.dailyCalorieTargetUpperBound;
   const dailyProteinNeed = props.dailyTargetValues.dailyProteinNeed;

   const dailyCalorieTargetInterval = `${dailyCalorieTargetLowerBound} - ${dailyCalorieTargetUpperBound}`;

   let totalCaloriesLabelStyle;

   if (
      totalCalories >= dailyCalorieTargetLowerBound &&
      totalCalories <= dailyCalorieTargetUpperBound
   ) {
      totalCaloriesLabelStyle = styles.success;
   } else if (totalCalories > dailyCalorieTargetUpperBound) {
      totalCaloriesLabelStyle = styles.excess;
   } else {
      totalCaloriesLabelStyle = null;
   }

   const totalProteinsLabelStyle = totalProteins >= dailyProteinNeed ? styles.success : null;

   return (
      <Fragment>

         <div className={styles.mobile}>
            <div>
               <h4>Calories Taken</h4>
               <p className={totalCaloriesLabelStyle}>{totalCalories} kcal</p>
               <h4>Target</h4>
               <p>{dailyCalorieTargetInterval} kcal</p>
            </div>
            <div>
               <h4>Proteins Taken</h4>
               <p className={totalProteinsLabelStyle}>{totalProteins} gram</p>
               <h4>Target</h4>
               <p>{dailyProteinNeed} gram</p>
            </div>
         </div>

         <div className={styles.desktop}>
            <div className={styles.group}>
               <div className={styles['group-unit']}>
                  <h4>Calories Taken: </h4>
                  <p className={totalCaloriesLabelStyle}>{totalCalories} kcal</p>
               </div>
               <div className={styles['group-unit']}>
                  <h4>Target: </h4>
                  <p>{dailyCalorieTargetInterval} kcal</p>
               </div>
            </div>
            <div className={styles.group}>
               <div className={styles['group-unit']}>
                  <h4>Proteins Taken: </h4>
                  <p className={totalProteinsLabelStyle}>{totalProteins} gram</p>
               </div>
               <div className={styles['group-unit']}>
                  <h4>Target: </h4>
                  <p>{dailyProteinNeed} gram</p>
               </div>
            </div>
         </div>

      </Fragment>
   );
}
import { useSelector } from 'react-redux';
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
      <div className={styles.container}>
         <div>
            <div className={styles.group}>
               <label>Calories Taken:</label>
               <p className={totalCaloriesLabelStyle}>{totalCalories} kcal</p>
            </div>
            <div className={styles.group}>
               <label>Target:</label>
               <p>{dailyCalorieTargetInterval} kcal</p>
            </div>
            <div className={styles.lateral}>
               <label>Calories Taken:</label>
               <p className={totalCaloriesLabelStyle}>{totalCalories} kcal</p>
               <p>/</p>
               <p>{dailyCalorieTargetInterval} kcal</p>
            </div>
         </div>
         <div>
            <div className={styles.group}>
               <label>Proteins Taken:</label>
               <p className={totalProteinsLabelStyle}>{totalProteins} gram</p>
            </div>
            <div className={styles.group}>
               <label>Target:</label>
               <p>{dailyProteinNeed} gram</p>
            </div>
            <div className={styles.lateral}>
               <label>Proteins Taken:</label>
               <p className={totalProteinsLabelStyle}>{totalProteins} gram</p>
               <p>/</p>
               <p>{dailyProteinNeed} gram</p>
            </div>
         </div>
      </div>
   );
}
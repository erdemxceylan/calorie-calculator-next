import { Button } from 'primereact/button';
import styles from './Button.module.css';

export default function Reset({ onClick }) {
   return (
      <Button
         icon='pi pi-times-circle'
         className={styles.button}
         onClick={onClick}
      />
   );
}
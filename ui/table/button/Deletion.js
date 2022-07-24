import { Button } from 'primereact/button';
import styles from './Button.module.css';

export default function Deletion({ icon, onClick }) {
   return (
      <Button
         icon='pi pi-trash'
         className={styles.button}
         onClick={onClick}
      />
   );
}
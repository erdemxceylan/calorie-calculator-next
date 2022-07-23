import { Button } from 'primereact/button';
import styles from './Deletion/module.css';

export default function Deletion({ onClick }) {
   return (
      <Button
         icon='pi pi-trash'
         className={styles.button}
         onClick={onClick}
      />
   );
}
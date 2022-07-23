import { Button } from 'primereact/button';
import styles from './Deletion.module.css';

export default function Deletion({ icon, onClick }) {
   return (
      <Button
         icon={icon ? icon : 'pi pi-trash'}
         className={styles.button}
         onClick={onClick}
      />
   );
}
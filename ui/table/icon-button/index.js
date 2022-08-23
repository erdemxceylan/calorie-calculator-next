import { Button } from 'primereact/button';
import styles from './styles.module.css';

export default function IconButton({ icon, onClick }) {
   return (
      <Button
         icon={icon}
         className={styles.button}
         onClick={onClick}
      />
   );
}
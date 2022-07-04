import { Dialog } from 'primereact/dialog';
import MyForm from './MyForm';
import styles from './MyForm.module.css';

export default function DataSettings(props) {
   return (
      <Dialog
         className={styles.modal}
         header={props.header}
         visible={props.visible}
         onHide={props.onHide}
         resizable={false}
         draggable={false}
      >
         <MyForm />
      </Dialog>
   );
}
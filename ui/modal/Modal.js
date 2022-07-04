import { Dialog } from 'primereact/dialog';
import styles from './Modal.module.css';

export default function Modal(props) {
   return (
      <Dialog
         className={styles.modal}
         header={props.header}
         visible={props.visible}
         onHide={props.onHide}
         resizable={props.resizable}
         draggable={props.draggable}
      >
         {props.content}
      </Dialog>
   );
}
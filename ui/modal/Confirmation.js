import { Button } from 'primereact/button';
import Modal from './Modal';
import styles from './Confirmation.module.css';

export default function Confirmation(props) {
   const content = (
      <div className={styles.container}>
         <Button className='button' label={props.cancelLabel} onClick={props.onCancelClick} />
         <Button label={props.confirmLabel} onClick={props.onConfirmClick} />
      </div>
   );

   return (
      <Modal
         header={props.header}
         visible={props.visible}
         onHide={props.onHide}
         content={content}
         resizable={false}
         draggable={false}
      />
   );
}
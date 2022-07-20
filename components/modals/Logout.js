import { Button } from 'primereact/button';
import React from 'react';
import Modal from '../../ui/modal/Modal';
import styles from './Logout.module.css';

function Logout(props) {
   const content = (
      <div className={styles.container}>
         <Button label='Cancel' />
         <Button label='Logout' />
      </div>
   );

   return (
      <Modal
         header='Are you sure?'
         visible={props.visible}
         onHide={props.onHide}
         content={content}
         resizable={false}
         draggable={false}
      />
   );
}

export default Logout;
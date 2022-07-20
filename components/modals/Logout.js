import { useContext } from 'react';
import { Button } from 'primereact/button';
import AuthContext from '../../global/context/auth';
import Modal from '../../ui/modal/Modal';
import styles from './Logout.module.css';

export default function Logout(props) {
   const auth = useContext(AuthContext);

   function logoutHandler() {
      auth.logout();
      props.onHide();
   }

   const content = (
      <div className={styles.container}>
         <Button className='button' label='Cancel' onClick={props.onHide} />
         <Button label='Logout' onClick={logoutHandler} />
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
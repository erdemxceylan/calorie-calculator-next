import { Dialog } from 'primereact/dialog';
import MyForm from './MyForm';

export default function DataSettings(props) {
   return (
      <Dialog
         className='modal'
         header='Data Settings'
         visible={props.visible}
         onHide={props.onHide}
         resizable={false}
         draggable={false}
      >
         <MyForm />
      </Dialog>
   );
}
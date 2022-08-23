import { useContext } from 'react';
import AuthContext from '../../../global/context/auth';
import Confirmation from '../../../ui/overlays/confirmation';

export default function Logout(props) {
   const auth = useContext(AuthContext);

   function logoutHandler() {
      auth.logout();
      props.onHide();
   }

   return (
      <Confirmation
         header='Are you sure?'
         visible={props.visible}
         onHide={props.onHide}
         confirmLabel='Logout'
         onCancelClick={props.onHide}
         onConfirmClick={logoutHandler}
      />
   );
}
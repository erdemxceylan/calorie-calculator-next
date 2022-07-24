import { useDispatch } from 'react-redux';
import { consumedNutrientsActions } from '../../global/redux/consumed-nutrients';
import Confirmation from '../../ui/modal/Confirmation';

export default function Reset(props) {
   const dispatch = useDispatch();

   function resetHandler() {
      dispatch(consumedNutrientsActions.reset());
      props.onHide();
   }

   return (
      <Confirmation
         header='Clear table?'
         visible={props.visible}
         onHide={props.onHide}
         confirmLabel='Clear'
         onCancelClick={props.onHide}
         onConfirmClick={resetHandler}
      />
   );
}
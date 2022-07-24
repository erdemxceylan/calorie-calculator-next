import Confirmation from '../../ui/modal/Confirmation';

export default function Reset(props) {
   function reset() {
      console.log('Reset');
      props.onHide();
   }

   return (
      <Confirmation
         header='Clear table?'
         visible={props.visible}
         onHide={props.onHide}
         cancelLabel='Cancel'
         confirmLabel='Clear'
         onCancelClick={props.onHide}
         onConfirmClick={reset}
      />
   );
}
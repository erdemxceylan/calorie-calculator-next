import Modal from '../modal/Modal';
import Form from '../form/Form';

export default function FormModal(props) {
   const form = (
      <Form
         inputs={props.inputs}
         validationSchema={props.validationSchema}
         onSubmit={props.onSubmit}
         submitButtonLabel={props.submitButtonLabel}
      />
   );

   return (
      <Modal
         header={props.header}
         visible={props.visible}
         onHide={props.onHide}
         content={form}
         resizable={props.resizable}
         draggable={props.draggable}
      />
   );
}
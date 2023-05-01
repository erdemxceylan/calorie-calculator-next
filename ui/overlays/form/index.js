import Form from '../../form'
import Loading from '../../loading/loading'
import Modal from '../modal'

export default function FormModal(props) {
	const { loading, submitted } = props

	const form = (
		<Form
			inputs={props.inputs}
			validationSchema={props.validationSchema}
			onSubmit={props.onSubmit}
			submitButtonLabel={props.submitButtonLabel}
			disabled={props.disabled}
		/>
	)

	return (
		<Modal
			header={props.header}
			visible={props.visible}
			onHide={props.onHide}
			content={loading ? <Loading /> : submitted ? <Loading complete /> : form}
			resizable={props.resizable}
			draggable={props.draggable}
		/>
	)
}

import { Button } from 'primereact/button'
import Modal from '../modal'
import styles from './styles.module.css'

export default function Confirmation(props) {
	const content = (
		<div className={styles.container}>
			<Button
				label={props.cancelLabel ? props.cancelLabel : 'Cancel'}
				onClick={props.onCancelClick}
			/>
			<Button className='button' label={props.confirmLabel} onClick={props.onConfirmClick} />
		</div>
	)

	return (
		<Modal
			header={props.header}
			visible={props.visible}
			onHide={props.onHide}
			content={content}
			resizable={false}
			draggable={false}
		/>
	)
}

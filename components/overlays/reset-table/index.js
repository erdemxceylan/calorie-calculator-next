import Confirmation from '../../../ui/overlays/confirmation'
import { consumedNutrientsActions } from '../../../global/redux/consumed-nutrients'
import { useDispatch } from 'react-redux'

export default function Reset(props) {
	const dispatch = useDispatch()

	function resetHandler() {
		dispatch(consumedNutrientsActions.reset())
		props.onHide()
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
	)
}

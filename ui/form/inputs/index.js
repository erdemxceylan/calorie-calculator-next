import { ErrorMessage } from 'formik'
import Input from './input'
import Password from './password'
import Radio from './radio'
import styles from './styles.module.css'

export default function Inputs(props) {
	const { type, name, errors, touched, ...rest } = props
	const invalid = errors[name] && touched[name] ? styles.invalid : null
	let input

	switch (type) {
		case 'radio':
			input = <Radio name={name} type={type} {...rest} />
			break
		case 'password':
			input = <Password className={invalid} name={name} type={type} {...rest} />
			break
		default:
			input = <Input className={invalid} name={name} type={type} {...rest} />
			break
	}

	return (
		<div>
			{input}
			<ErrorMessage className={styles['error-message']} name={name} component='p' />
		</div>
	)
}

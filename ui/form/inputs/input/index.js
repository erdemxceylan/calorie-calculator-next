import { Field } from 'formik'
import { InputText } from 'primereact/inputtext'

export default function Input(props) {
	const { className, name, type, ...rest } = props

	return (
		<Field name={name}>
			{({ field }) => <InputText className={className} type={type} {...field} {...rest} />}
		</Field>
	)
}

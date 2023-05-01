import * as Yup from 'yup'

import { Fragment, useContext } from 'react'

import AuthContext from '../../../global/context/auth'
import { Button } from 'primereact/button'
import { CONSTANTS } from '../../../global/constants'
import Form from '../../../ui/form'
import Loading from '../../../ui/loading/loading'
import Modal from '../../../ui/overlays/modal'
import styles from './styles.module.css'
import useHttpRequest from '../../../hooks/use-http-request'
import useSubmit from '../../../hooks/use-submit'

const { AUTH_URL, POST, ADMIN } = CONSTANTS

export default function Login(props) {
	const { visible, onHide } = props
	const auth = useContext(AuthContext)
	const { isLoading, sendRequest: sign } = useHttpRequest()
	const { isSubmitted, submitHandler } = useSubmit()

	const inputs = [
		{ name: 'email', placeholder: 'Email', type: 'email', initialValue: '' },
		{
			name: 'password',
			placeholder: 'Password',
			type: 'password',
			initialValue: '',
		},
	]

	const validationSchema = Yup.object({
		email: auth.isLoggingIn
			? Yup.string().email('Please enter a valid email').required('Please enter your email')
			: Yup.string()
					.email('Please enter a valid email')
					.required('Please enter your email')
					.notOneOf([ADMIN], `${ADMIN} is reserved`),
		password: Yup.string()
			.required('Please enter your password')
			.min(7, 'Password has to be 7 characters minimum'),
	})

	const onSubmit = async values =>
		await submitHandler(
			AUTH_URL,
			POST,
			{ isLoggingIn: auth.isLoggingIn, ...values },
			sign,
			data => auth.login(data.idToken, data.email),
			onHide
		)

	const content = (
		<Fragment>
			<Form
				inputs={inputs}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
				submitButtonLabel={auth.isLoggingIn ? 'Login' : 'Sign up'}
			/>
			<Button
				className={styles.switch}
				label={auth.isLoggingIn ? 'Create a new account' : 'Login with an existing account'}
				onClick={auth.switchToSignup}
			/>
		</Fragment>
	)

	return (
		<Modal
			header={auth.isLoggingIn ? 'Login' : 'Sign up'}
			visible={visible}
			onHide={onHide}
			content={isLoading ? <Loading /> : isSubmitted ? <Loading complete /> : content}
			resizable={false}
			draggable={false}
		/>
	)
}

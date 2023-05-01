export default function Loading(props) {
	const { font, complete } = props

	return (
		<i
			className={complete ? ' pi pi-check' : ' pi pi-spin pi-spinner'}
			style={{ fontSize: font || '3rem' }}
		/>
	)
}

import { Column } from 'primereact/column'

export default function Numeration({ header, body }) {
	return (
		<Column
			header={header}
			headerStyle={{ width: '2rem', minWidth: '2rem' }}
			bodyStyle={{ textAlign: 'center' }}
			body={body}
		/>
	)
}

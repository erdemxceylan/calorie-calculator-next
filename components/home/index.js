import ConsumedNutrientsTable from './table'
import DataMenu from './body-data'
import { Fragment } from 'react'
import Selection from './selection'
import { useSelector } from 'react-redux'

export default function Home(props) {
	const isEmpty = useSelector(state => state.consumedNutrients.isEmpty)

	return (
		<Fragment>
			<DataMenu dataSettings={props.dataSettings} />
			<Selection nutrients={props.nutrients} />
			{!isEmpty && <ConsumedNutrientsTable dailyTargetValues={props.dailyTargetValues} />}
		</Fragment>
	)
}
